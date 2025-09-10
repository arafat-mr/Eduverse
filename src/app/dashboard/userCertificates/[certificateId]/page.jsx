"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useReactToPrint } from "react-to-print";
import useAuth from "@/app/hooks/useAuth";

export default function CertificateView() {
  const { certificateId } = useParams();
  const user = useAuth();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const certificateRef = useRef(null);

  // Fetch certificate data
  useEffect(() => {
    if (!certificateId || !user?.email) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/userCertificates/${certificateId}?email=${user.email}`
        );
        const data = await res.json();

        if (res.ok) {
          setCertificate(data.certificate);
        } else {
          console.error("❌", data.error);
          setCertificate(null);
        }
      } catch (err) {
        console.error(err);
        setCertificate(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [certificateId, user?.email]);

  // ✅ react-to-print (v3+) requires `contentRef`
  const handlePrint = useReactToPrint({
    contentRef: certificateRef,
    documentTitle: certificate?.name
      ? `${certificate.name}-certificate`
      : "certificate",
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl text-white">
        Loading certificate...
      </div>
    );

  if (!certificate)
    return <div className="p-6 text-red-500">Certificate not found.</div>;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6 rounded-2xl">
      {/* Certificate Container */}
      <div
        ref={certificateRef}
        className="relative w-[900px] h-[800px] p-1 rounded-2xl"
      >
        {/* Gradient border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-yellow-400 to-blue-600 shadow-2xl"></div>

        {/* Inner content */}
        <div className="relative w-full h-full bg-white rounded-2xl p-12 font-serif overflow-hidden flex flex-col items-center">
          {/* Logo + Eduverse */}
          <div className="flex flex-col justify-center items-center mb-6">
            <img src="/EduLogo.png" alt="Eduverse Logo" className="h-20" />
            <h2 className="mt-2 text-2xl font-bold text-gray-800 tracking-wide">
              Eduverse Academy
            </h2>
            <p className="text-gray-600 italic text-sm">
              Empowering learners worldwide
            </p>
          </div>

          {/* Certificate Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-gray-800 tracking-widest uppercase">
            Certificate of Completion
          </h1>
          <p className="text-center text-gray-600 italic mb-6 text-lg">
            This certifies that
          </p>

          {/* Recipient Name */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-6 underline decoration-wavy">
            {certificate.name}
          </h2>

          {/* Course info */}
          <p className="text-center text-lg text-gray-700 mb-4">
            has successfully completed the course
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-6 italic">
            “{certificate.courseTitle}”
          </h3>

          {/* Description */}
          <p className="text-center text-gray-700 mb-10 px-12">
            This certificate is awarded in recognition of the learner’s
            dedication, commitment, and successful completion of all
            requirements of the course.
          </p>

          {/* Footer */}
          <div className="flex justify-between items-end mt-auto px-6 w-full">
            {/* Left Info */}
            <div className="text-gray-700">
              <p>
                <span className="font-semibold">Date of Issue:</span>{" "}
                {certificate.issuedAt
                  ? new Date(certificate.issuedAt).toLocaleDateString()
                  : "-"}
              </p>
              <p className="text-blue-900 font-bold">
                Certificate ID: {certificate.certificateId}
              </p>
            </div>

            {/* Right Signature */}
            <div className="text-center">
              <img
                src="/signature.png"
                alt="Admin Signature"
                className="h-16 mx-auto mb-1"
              />
              <p className="text-gray-700 font-medium border-t-2 border-gray-400 pt-1">
                Admin
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Print / Download Button */}
      <button
        onClick={handlePrint}
        className="mt-8 px-8 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-600 transition text-lg font-medium"
      >
        Download PDF
      </button>
    </div>
  );
}
