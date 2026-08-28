import React, { useState } from 'react';
import { 
  MessageSquare, Calendar, Clock, Phone, Car, 
  Sparkles, CheckCircle2, Search, Filter, ChevronDown, FileText 
} from 'lucide-react';
import { getWhatsAppConfirmationUrl } from '../../utils/whatsappConfirmation';

export default function WebsiteBookingsTable({ bookings = [], onAllocateSlot, onStatusChange }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Filter bookings based on search & status
  const filteredBookings = bookings.filter(b => {
    const matchesSearch = 
      (b.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.phone || '').includes(searchTerm) ||
      (b.vehicle_brand || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (b.vehicle_model || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === 'ALL' || 
      (b.status || 'pending').toUpperCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full space-y-4">
      {/* Top Controls Bar: Search & Status Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by customer name, phone, or car..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'PENDING', 'CONFIRMED'].map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                statusFilter === tab
                  ? 'bg-black text-white shadow-sm'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200/60'
              }`}
            >
              {tab} {tab === 'PENDING' && `(${bookings.filter(b => (b.status || 'pending') === 'pending').length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stacked-Cell Table */}
      <div className="w-full rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-[1.8fr_2fr_1.5fr_1.8fr] gap-4 px-6 py-3.5 bg-gray-50/80 border-b border-gray-100 text-[11px] font-bold uppercase tracking-wider text-gray-400 select-none">
          <div>Customer & Vehicle</div>
          <div>Interested Services</div>
          <div>Requested Schedule</div>
          <div className="text-right">Actions & Confirmation</div>
        </div>

        {/* Table Body */}
        {filteredBookings.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">
            No bookings found matching your search.
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredBookings.map((booking) => {
              const servicesList = Array.isArray(booking.services) 
                ? booking.services 
                : (booking.services ? String(booking.services).split(',') : [booking.service_name || 'Detailing']);

              return (
                <div 
                  key={booking.id || booking.booking_id}
                  className="grid grid-cols-[1.8fr_2fr_1.5fr_1.8fr] gap-4 px-6 py-4 items-center hover:bg-amber-50/30 transition-colors"
                >
                  {/* Col 1: Customer & Vehicle (Stacked) */}
                  <div className="min-w-0 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 text-white font-bold flex items-center justify-center text-sm shrink-0 shadow-sm">
                      {booking.full_name?.charAt(0)?.toUpperCase() || 'C'}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{booking.full_name}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 truncate mt-0.5">
                        <span className="font-semibold text-gray-800 capitalize">
                          🚗 {booking.vehicle_brand} {booking.vehicle_model}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>{booking.phone}</span>
                      </p>
                    </div>
                  </div>

                  {/* Col 2: Interested Services (Pills) */}
                  <div className="min-w-0 flex flex-wrap items-center gap-1.5">
                    {servicesList.slice(0, 2).map((srv, idx) => (
                      <span 
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200/60 truncate max-w-full"
                      >
                        <Sparkles className="w-3 h-3 text-amber-600 shrink-0" />
                        <span className="truncate">{String(srv).trim()}</span>
                      </span>
                    ))}
                    {servicesList.length > 2 && (
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-gray-100 text-gray-600">
                        +{servicesList.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Col 3: Requested Date & Slot (Stacked) */}
                  <div className="min-w-0 text-xs">
                    <div className="font-bold text-gray-900 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{booking.preferred_date ? new Date(booking.preferred_date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Date Pending'}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-amber-800 font-medium mt-0.5">
                      <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                      <span className="truncate">{booking.allocated_time || booking.preferred_time_period || 'Slot Pending'}</span>
                    </div>
                  </div>

                  {/* Col 4: Action & WhatsApp Buttons + Notes */}
                  <div className="min-w-0 flex flex-col items-end gap-1.5">
                    <div className="flex items-center gap-2">
                      {/* WhatsApp 1-Click Button */}
                      <a
                        href={getWhatsAppConfirmationUrl(booking)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-black font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-[#25D366]/20 transition-transform active:scale-95 cursor-pointer"
                        title="Send Instant WhatsApp Confirmation"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        WhatsApp
                      </a>

                      {/* Allocate Slot / Manage Button */}
                      <button
                        type="button"
                        onClick={() => onAllocateSlot && onAllocateSlot(booking)}
                        className="h-8 px-3 rounded-lg bg-gray-900 hover:bg-amber-600 text-white font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        Slot
                      </button>
                    </div>

                    {/* Customer Notes (Truncated with tooltip) */}
                    {booking.additional_notes && (
                      <span 
                        className="text-[11px] text-gray-400 italic truncate max-w-[210px] flex items-center gap-1"
                        title={booking.additional_notes}
                      >
                        <FileText className="w-3 h-3 text-gray-400 shrink-0" />
                        "{booking.additional_notes}"
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
