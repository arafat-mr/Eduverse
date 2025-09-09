"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function CertificateView() {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const certificateRef = useRef();

  useEffect(() => {
    if (!certificateId) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/userCertificates/${certificateId}`);
        const data = await res.json();
        setCertificate(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [certificateId]);

  const downloadPDF = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "pt", [canvas.width, canvas.height]);
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`${certificate.certificateId}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-white">
        Loading certificate <span className="ml-2 loading loading-spinner text-white"></span>
      </div>
    );
  }

  if (!certificate) {
    return <div className="p-6 text-red-500">Certificate not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 p-6">
      
      {/* Certificate Container */}
      <div ref={certificateRef} className="relative w-[850px] h-[750px] p-1 rounded-2xl">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-yellow-400 to-blue-500 shadow-2xl"></div>

        <div className="relative w-full h-full bg-white rounded-2xl p-12 font-serif overflow-hidden">
          
          {/* Logo + Eduverse */}
          <div className="flex flex-col justify-center items-center mb-4">
            <img src="/EduLogo.png" alt="Eduverse Logo" className="h-24" />
            <h2 className="mt-2 text-3xl font-bold text-gray-800">Eduverse</h2>
            <p className="text-gray-600 italic text-sm mt-1">Empowering learners worldwide</p>
            <p className="text-gray-500 text-xs">www.eduverse.com</p>
          </div>

          {/* Certificate Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-gray-800 tracking-wide">
            Certificate of Completion
          </h1>
          <p className="text-center text-gray-600 italic mb-6 text-lg">
            This is proudly presented to
          </p>

          {/* Learner Name */}
          <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-900 mb-6">
            {certificate.name}
          </h2>

          {/* Course */}
          <p className="text-center text-lg text-gray-700 mb-4">
            For successfully completing the course
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-gray-900 mb-6">
            “{certificate.courseName}”
          </h3>

          <p className="text-center text-gray-700 mb-10 px-12">
            This certifies that the above learner has demonstrated proficiency and completed all requirements of the course.
          </p>

          {/* Footer */}
          <div className="flex justify-between items-center mt-16 px-6 ">
            <div className="text-gray-700">
              <p>Date of Issue: {certificate.issuedAt ? new Date(certificate.issuedAt).toLocaleDateString() : "-"}</p>
              <p className=" text-blue-900 font-bold">Certificate ID: {certificate.certificateId}</p>
            </div>

            <div className="text-center -mt-8">
              <img src="/signature.png" alt="Admin Signature" className="h-14 mx-auto mb-2 -mt-2" />
              <p className="text-gray-700 font-medium">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadPDF}
        className="mt-8 px-8 py-3 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-600 transition text-lg font-medium"
      >
        Download PDF
      </button>
    </div>
  );
}  