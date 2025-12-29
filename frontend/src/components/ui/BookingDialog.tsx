'use client';

import { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { BookingCalendar } from '@/components/BookingCalendar';
import { submitBooking, type BookingRequest } from '@/lib/api';

interface BookingDialogProps {
    isOpen: boolean;
    onClose: () => void;
    vehicleId?: number;
    vehicleName?: string;
    serviceId?: number;
    serviceName?: string;
}

export function BookingDialog({
    isOpen,
    onClose,
    vehicleId,
    vehicleName,
    serviceId,
    serviceName,
}: BookingDialogProps) {
    const [formState, setFormState] = useState({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        start_date: '',
        end_date: '',
        start_time: '',
        pickup_location: '',
        dropoff_location: '',
        notes: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [bookingNumber, setBookingNumber] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [dateError, setDateError] = useState<string | null>(null);

    const handleDateRangeSelect = (range: { start: string; end: string } | null) => {
        setDateError(null);
        if (range) {
            setFormState((prev) => ({
                ...prev,
                start_date: range.start,
                end_date: range.end,
            }));
        } else {
            setFormState((prev) => ({
                ...prev,
                start_date: '',
                end_date: '',
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formState.start_date || !formState.end_date) {
            setDateError('Please select your rental dates from the calendar');
            return;
        }

        setIsSubmitting(true);
        setError(null);
        setDateError(null);

        try {
            const bookingData: BookingRequest = {
                customer_name: formState.customer_name,
                customer_email: formState.customer_email,
                customer_phone: formState.customer_phone,
                start_date: formState.start_date,
                end_date: formState.end_date,
                start_time: formState.start_time || undefined,
                pickup_location: formState.pickup_location,
                dropoff_location: formState.dropoff_location || undefined,
                notes: formState.notes || undefined,
                vehicle_id: vehicleId,
                service_id: serviceId,
            };

            const result = await submitBooking(bookingData);
            setBookingNumber(result.booking_number);
            setIsSubmitted(true);
            setFormState({
                customer_name: '',
                customer_email: '',
                customer_phone: '',
                start_date: '',
                end_date: '',
                start_time: '',
                pickup_location: '',
                dropoff_location: '',
                notes: '',
            });
        } catch (err: unknown) {
            const apiError = err as { message?: string; errors?: Record<string, string[]> };
            if (apiError.errors?.dates) {
                setDateError(apiError.errors.dates[0]);
            } else if (apiError.errors) {
                const firstError = Object.values(apiError.errors)[0];
                setError(firstError?.[0] || apiError.message || 'Failed to submit booking');
            } else {
                setError(apiError.message || 'Failed to submit booking. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setIsSubmitted(false);
        setError(null);
        setDateError(null);
        setBookingNumber('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-light">
                        Book <span className="font-bold">{vehicleName || serviceName || 'Now'}</span>
                    </DialogTitle>
                </DialogHeader>

                {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-20 h-20 bg-green-500 flex items-center justify-center mb-6">
                            <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h4 className="text-2xl font-medium text-gray-900 mb-2">Booking Submitted!</h4>
                        <p className="text-gray-500 mb-4">Your booking number is:</p>
                        <p className="text-xl font-bold text-amber-600 bg-amber-50 px-6 py-3 mb-6">
                            {bookingNumber}
                        </p>
                        <p className="text-gray-500 text-sm max-w-md">
                            We've sent a confirmation email to your inbox. Our team will contact you shortly to confirm your booking.
                        </p>
                        <Button
                            onClick={handleClose}
                            className="mt-8 bg-black hover:bg-amber-500 rounded-none px-8"
                        >
                            Close
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                        {/* Customer Info */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 border-b pb-2">
                                Contact Information
                            </h3>
                            <div>
                                <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 block">
                                    Full Name *
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Your full name"
                                    value={formState.customer_name}
                                    onChange={(e) => setFormState({ ...formState, customer_name: e.target.value })}
                                    required
                                    className="border-gray-200 rounded-none h-12 focus:border-amber-500"
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 block">
                                        Email *
                                    </label>
                                    <Input
                                        type="email"
                                        placeholder="email@example.com"
                                        value={formState.customer_email}
                                        onChange={(e) => setFormState({ ...formState, customer_email: e.target.value })}
                                        required
                                        className="border-gray-200 rounded-none h-12 focus:border-amber-500"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 block">
                                        Phone *
                                    </label>
                                    <Input
                                        type="tel"
                                        placeholder="+62"
                                        value={formState.customer_phone}
                                        onChange={(e) => setFormState({ ...formState, customer_phone: e.target.value })}
                                        required
                                        className="border-gray-200 rounded-none h-12 focus:border-amber-500"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Rental Dates - Calendar */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 border-b pb-2">
                                <CalendarIcon className="w-4 h-4 inline mr-2" />
                                Select Rental Dates *
                            </h3>

                            {dateError && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded">
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>{dateError}</span>
                                </div>
                            )}

                            <BookingCalendar
                                vehicleId={vehicleId}
                                onDateRangeSelect={handleDateRangeSelect}
                                initialStartDate={formState.start_date}
                                initialEndDate={formState.end_date}
                            />

                            <div>
                                <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 block">
                                    <Clock className="w-3 h-3 inline mr-2" />
                                    Pickup Time
                                </label>
                                <Input
                                    type="time"
                                    value={formState.start_time}
                                    onChange={(e) => setFormState({ ...formState, start_time: e.target.value })}
                                    className="border-gray-200 rounded-none h-12 focus:border-amber-500 max-w-xs"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500 border-b pb-2">
                                Location
                            </h3>
                            <div>
                                <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 block">
                                    <MapPin className="w-3 h-3 inline mr-2" />
                                    Pickup Location *
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Hotel name, Airport, or Address"
                                    value={formState.pickup_location}
                                    onChange={(e) => setFormState({ ...formState, pickup_location: e.target.value })}
                                    required
                                    className="border-gray-200 rounded-none h-12 focus:border-amber-500"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 block">
                                    <MapPin className="w-3 h-3 inline mr-2" />
                                    Dropoff Location
                                </label>
                                <Input
                                    type="text"
                                    placeholder="Leave empty if same as pickup"
                                    value={formState.dropoff_location}
                                    onChange={(e) => setFormState({ ...formState, dropoff_location: e.target.value })}
                                    className="border-gray-200 rounded-none h-12 focus:border-amber-500"
                                />
                            </div>
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2 block">
                                Additional Notes
                            </label>
                            <Textarea
                                placeholder="Special requests or additional information..."
                                value={formState.notes}
                                onChange={(e) => setFormState({ ...formState, notes: e.target.value })}
                                rows={3}
                                className="border-gray-200 rounded-none resize-none focus:border-amber-500"
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="w-full bg-black hover:bg-amber-500 rounded-none py-6 text-sm uppercase tracking-[0.15em]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                'Submit Booking'
                            )}
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
