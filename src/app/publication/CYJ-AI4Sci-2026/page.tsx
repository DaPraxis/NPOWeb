'use client';

import React from 'react';
import { Timeline, Steps } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';

export default function PublicationPage() {
  return (
    <section className="px-6 py-30">
      <div className="max-w-5xl mx-auto space-y-20">

        {/* Section Title */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 my-10 text-left">
            Call for Papers:
          </h1>
          <h1 className="text-4xl md:text-4xl font-bold text-gray-800 mb-4 my-10 text-left">
            Canadian Youth Journal of AI for Science 2026 Spring
          </h1>
          <p className="text-lg text-gray-600 text-left">
            We invite all high school students across Canada to submit original research papers in the field of Artificial Intelligence and scientific inquiry. Selected papers will be published in the 2026 Spring edition.
          </p>
        </div>

        {/* Timeline + Cover Visual */}
        <div className="mt-10 flex flex-col md:flex-row items-start gap-10">
          {/* Timeline */}
          <div className="w-full md:w-7/12">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Submission Timeline</h3>
            <Timeline
              mode="left"
              items={[
                {
                  label: 'August 2025',
                  children: 'Submission Portal Opens',
                  color: 'green',
                },
                {
                  label: 'September 10, 2025',
                  children: 'First Round: Abstract Submission (no strict format)',
                  dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />
                },
                {
                  label: 'September 24, 2025',
                  children: 'First Round: Full Paper Submission (no strict format)',
                  dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />
                },
                {
                  label: 'October 20, 2025',
                  children: 'Peer Review Feedback Released',
                },
                {
                  label: 'November 5, 2025',
                  children: 'Second Round: Camera-Ready Submission (official templates required)',
                  dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />
                },
                {
                  label: 'Spring 2026',
                  children: 'Publication in Journal',
                  dot: '🎉',
                },
              ]}
              className="text-gray-700"
            />
          </div>
          {/* Cover */}
          <div className="w-full md:w-5/12 flex justify-center">
            {/* You can use an <img> or PublicationCover component here */}
            <img
              src="/assets/papers/pub1.png"
              alt="Journal Cover"
              className="r max-w-full"
            />
            {/* OR: <PublicationCover preSeed={2708110074} coverText={"Canadian Youth Journal of"} coverText2="AI for Science" /> */}
          </div>
        </div>

        {/* Topics of Interest */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Topics of Interest</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Machine learning methods: supervised, unsupervised, reinforcement learning</li>
            <li>AI applications in science, including biology, physics, chemistry, environmental science, etc.</li>
            <li>Data science and big data analytics</li>
            <li>Ethical and responsible AI development</li>
            <li>Robotics, autonomous systems, and planning</li>
            <li>Interdisciplinary research combining AI with other fields</li>
          </ul>
        </div>

        {/* Submission Guidelines */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Submission Guidelines</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Eligibility: High school students in Canada (Grades 8–12).</li>
            <li>Team submissions allowed (up to 3 students per paper).</li>
            <li>
              <span className="font-semibold">First Round Submission: </span> 
              Papers can be submitted in any readable format (Word or PDF). No strict template required initially.
            </li>
            <li>
              Word Count Guidelines for First Round:
              <ul className="list-disc list-inside ml-6">
                <li>Abstract: 150–300 words</li>
                <li>Introduction: 400–600 words</li>
                <li>Method/Experiment: 500–800 words</li>
                <li>Results: 300–500 words</li>
                <li>Discussion/Conclusion: 300–500 words</li>
              </ul>
            </li>
            <li>
              <span className="font-semibold">Second Round (Camera-Ready Submission): </span> 
              After acceptance, authors must reformat papers using the official templates: 
              <a 
                href="https://www.overleaf.com/latex/templates/ieee-conference-template/grfzhhncsfqn"
                className="text-blue-600 underline font-semibold hover:text-blue-800 mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                LaTeX
              </a> 
              or 
              <a 
                href="https://www.ieee.org/content/dam/ieee-org/ieee/web/org/conferences/conference-template-letter.docx"
                className="text-blue-600 underline font-semibold hover:text-blue-800 mx-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Word
              </a>.
            </li>
            <li>
              All figures, charts, and images must be high resolution:
              <ul className="list-disc list-inside ml-6">
                <li>Minimum resolution: <span className="font-semibold">300 DPI</span> for all images.</li>
                <li>Preferred formats: <span className="font-semibold">PNG</span>, <span className="font-semibold">SVG</span>, or <span className="font-semibold">PDF</span> (for vector graphics).</li>
                <li>Ensure all labels, text, and data points in images are clearly readable when scaled.</li>
              </ul>
            </li>
            <li>Original work only. Plagiarism will result in disqualification.</li>
            <li>
              All papers must properly cite prior work. Authors must:
              <ul className="list-disc list-inside ml-6">
                <li>Use either <span className="font-semibold">IEEE citation style</span> or <span className="font-semibold">APA 7th Edition style</span>.</li>
                <li>Include a bibliography at the end of the paper.</li>
                <li>Use simple inline citations during the First Round; <span className="font-semibold">full formatting</span> is required for the Camera-Ready version.</li>
                <li>Ensure citations are complete — plagiarism or improper citation will result in disqualification.</li>
              </ul>
            </li>
          </ul>
        </div>


        {/* Review Process */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Review Process & Final Selection</h2>
          <p className="text-gray-600 mb-4">
            All submissions will undergo a rigorous single-blind peer review. Each paper will receive constructive feedback from a panel of reviewers composed of university researchers, graduate students, and domain experts. Students are encouraged to treat this process as a valuable learning experience and a chance to improve their work.
          </p>
          <p className="text-gray-600 mb-4">
            Due to the expected volume of submissions, only a fraction of high-quality papers will be selected as <span className="font-semibold">finalists</span>. Finalist papers will be officially published in the 2026 Spring edition of the Canadian Youth Journal of AI for Science.
          </p>
          <p className="text-gray-600 mb-4">
            Our internal Review Committee will also nominate a select number of outstanding papers for special recognition through the following awards:
          </p>
          <ul className="list-disc list-inside ml-6 text-gray-600 mb-4">
            <li><span className="font-medium">Youth Impact Award</span></li>
            <li><span className="font-medium">Youth Innovation Award</span></li>
            <li><span className="font-medium">Gold Award</span></li>
            <li><span className="font-medium">Silver Award</span></li>
            <li><span className="font-medium">Bronze Award</span></li>
          </ul>
          <p className="text-gray-600">
            These recognitions are based on predefined evaluation criteria. For full details, visit the <a href="/publication/rubric" className="text-blue-600 underline font-medium hover:text-blue-800">Award Rubric</a> page.
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

        {/* Partners Section */}
        <section className="bg-gray-50 py-16 px-6 mt-10">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Academic & Peer Review Partners</h2>
            <p className="text-gray-600 mb-10">Our peer review process is supported by graduate students, researchers, and mentors affiliated with leading Canadian universities. Their involvement ensures the academic quality and rigor of all accepted publications.</p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
              <img src="/assets/partners/uoft.png" alt="University of Toronto" className="h-12 object-contain" />
              <img src="/assets/partners/ubc.png" alt="University of British Columbia" className="h-12 object-contain" />
              <img src="/assets/partners/mcgill.png" alt="McGill University" className="h-12 object-contain" />
              <img src="/assets/partners/western.jpg" alt="Western University" className="h-12 object-contain" />
              <img src="/assets/partners/mcmaster.png" alt="McMaster University" className="h-12 object-contain" />
            </div>
          </div>
        </section>


      </div>
    </section>
  );
}
