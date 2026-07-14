import React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function ConfirmModal({ open, title, message, confirmLabel = "Confirm", onConfirm, onCancel, danger = false }) {
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ background: "rgba(6,6,10,0.6)", backdropFilter: "blur(4px)" }}
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl p-6 border border-border"
            style={{
              background: "linear-gradient(180deg, rgba(25,25,37,0.97), rgba(15,15,22,0.98))",
              backdropFilter: "blur(16px)",
              boxShadow: "0 24px 60px -16px rgba(0,0,0,0.5)",
            }}
          >
            <h2 className="font-display text-lg font-semibold text-text mb-2">{title}</h2>
            <p className="text-sm text-muted mb-6">{message}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-surface2 text-text border border-border"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white"
                style={{ background: danger ? "linear-gradient(90deg,#F87171,#dc5a5a)" : "linear-gradient(90deg,#7C6FFF,#6656e0)" }}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
