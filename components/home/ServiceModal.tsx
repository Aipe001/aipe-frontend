"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronRight, FileText } from "lucide-react";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string | null;
  onSubServiceClick: (subServiceId: string) => void;
}

const serviceData: Record<
  string,
  { title: string; subServices: { id: string; name: string }[] }
> = {
  gst: {
    title: "GST Registration Services",
    subServices: [
      { id: "new-gst", name: "New GST Registration" },
      { id: "gst-return", name: "GST Return Filing" },
      { id: "gst-amendments", name: "GST Amendments" },
      { id: "gst-cancellation", name: "GST Cancellation" },
      { id: "gst-consultancy", name: "GST Consultancy" },
    ],
  },
  itr: {
    title: "ITR Filing Services",
    subServices: [
      { id: "itr-individual", name: "ITR for Individuals" },
      { id: "itr-business", name: "ITR for Business" },
      { id: "tax-planning", name: "Tax Planning" },
      { id: "tax-audit", name: "Tax Audit" },
    ],
  },
  "mutual-funds": {
    title: "Investment Services",
    subServices: [
      { id: "mf-sip", name: "Mutual Fund SIP" },
      { id: "mf-lumpsum", name: "Lumpsum Investment" },
      { id: "portfolio-review", name: "Portfolio Review" },
      { id: "retirement-planning", name: "Retirement Planning" },
    ],
  },
  loans: {
    title: "Business Loan Services",
    subServices: [
      { id: "term-loan", name: "Term Loan" },
      { id: "working-capital", name: "Working Capital Loan" },
      { id: "msme-loan", name: "MSME Loan" },
      { id: "startup-funding", name: "Startup Funding" },
    ],
  },
  insurance: {
    title: "Insurance Services",
    subServices: [
      { id: "life-insurance", name: "Life Insurance" },
      { id: "health-insurance", name: "Health Insurance" },
      { id: "business-insurance", name: "Business Insurance" },
      { id: "motor-insurance", name: "Motor Insurance" },
    ],
  },
  cibil: {
    title: "CIBIL Score Services",
    subServices: [
      { id: "cibil-check", name: "CIBIL Score Check" },
      { id: "cibil-improve", name: "Score Improvement" },
      { id: "credit-report", name: "Credit Report Analysis" },
      { id: "dispute-resolution", name: "Dispute Resolution" },
    ],
  },
};

export function ServiceModal({
  isOpen,
  onClose,
  serviceId,
  onSubServiceClick,
}: ServiceModalProps) {
  const service = serviceId ? serviceData[serviceId] : null;

  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-display text-primary">
            {service.title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3 mt-4">
          {service.subServices.map((subService) => (
            <button
              key={subService.id}
              onClick={() => onSubServiceClick(subService.id)}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent transition-colors group"
            >
              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <span className="font-medium text-foreground">
                  {subService.name}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
