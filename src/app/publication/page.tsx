'use client';

import React from 'react';

export default function PublicationPage() {
  return (
    <section className="px-6 py-30">
      <div className="max-w-5xl mx-auto space-y-20">

        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 my-10 text-left">
            Call for Papers:
          </h1>
          <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-4 my-10 text-left">
            Canadian Youth Journal of AI for Science 2026 Spring
          </h1>
          <p className="text-lg text-gray-600 text-left">
            We invite high school students across Canada to submit original research papers in the field of Artificial Intelligence and scientific inquiry. Selected papers will be published in the 2026 Spring edition.
          </p>
        </div>

        {/* Key Dates */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Dates</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-700">
              <thead className="border-b">
                <tr>
                  <th className="py-2 px-4">Milestone</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2 px-4">Abstract Submission Deadline</td>
                  <td className="py-2 px-4">September 10, 2025</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Full Paper Submission Deadline</td>
                  <td className="py-2 px-4">September 24, 2025</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4">Review Feedback Released</td>
                  <td className="py-2 px-4">October 20, 2025</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Final Camera-Ready Submission</td>
                  <td className="py-2 px-4">November 5, 2025</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Topics of Interest */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Topics of Interest</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>AI applications in biology, physics, chemistry, and environmental science</li>
            <li>Machine learning methods: supervised, unsupervised, reinforcement learning</li>
            <li>Data science and big data analytics</li>
            <li>Ethical and responsible AI development</li>
            <li>Robotics, autonomous systems, and planning</li>
            <li>Computational neuroscience and cognitive science</li>
            <li>Interdisciplinary research combining AI with other fields</li>
          </ul>
        </div>

        {/* Submission Guidelines */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submission Guidelines</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Eligibility: High school students in Canada (Grades 8–12)</li>
            <li>Team submissions allowed (up to 3 students per paper)</li>
            <li>Paper length: 4–8 pages (excluding references)</li>
            <li>Templates: LaTeX and Word templates will be provided (release July 2025)</li>
            <li>Original work only.</li>
          </ul>
        </div>

        {/* Review Process */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Review Process</h2>
          <p className="text-gray-600 mb-4">
            All submissions will undergo single-blind peer review. Each paper will receive detailed feedback from reviewers, including university researchers and graduate students. Final selections will be based on scientific rigor, clarity of presentation, and potential impact.
          </p>
          <p className="text-gray-600">
            Students are encouraged to view the review process as an opportunity for mentorship and improvement.
          </p>
        </div>

        {/* Submission Instructions */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">How to Submit</h2>
          <p className="text-gray-600 mb-4">
            The submission portal will open in August 2025. Authors must submit their abstracts and full papers through the official portal. Late submissions will not be considered.
          </p>
          <p className="text-gray-600">
            For questions about submission, please contact us at: <span className="font-semibold">general@futureera.foundation</span>
          </p>
        </div>

        {/* Ethics and Conduct */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Ethics and Conduct</h2>
          <p className="text-gray-600">
            Authors must adhere to the FutureEra Code of Conduct and the Code of Academic Integrity. All submissions must be the students' original work, and proper citations must be provided for referenced material.
          </p>
        </div>

      </div>
    </section>
  );
}
