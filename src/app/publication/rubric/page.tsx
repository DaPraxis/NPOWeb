'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

const levels = ['Missing (0)', 'Needs Work (1)', 'Fair (2)', 'Good (3)', 'Outstanding (4)'];

const criteriaMatrix = {
  'Problem Identification & Impact': [
    'No problem stated',
    'Vague or underdeveloped',
    'Some clarity and relevance',
    'Clear real-world alignment',
    'Deep insight, strongly researched and relevant'
  ],
  'AI & Technical Implementation': [
    'No meaningful AI use',
    'Basic or incorrect implementation',
    'Some relevance but limited use',
    'Functional and relevant AI use',
    'Well-integrated, innovative, technically sound'
  ],
  'Functionality & User Testing': [
    'Non-functional or missing',
    'Partially working, little testing',
    'Functional, limited feedback used',
    'Functional and improved through testing',
    'Robust, refined via thorough iteration'
  ],
  'Creativity & Innovation': [
    'No novelty or original ideas',
    'Basic idea or standard approach',
    'Some creative elements present',
    'Creative solution with visible innovation',
    'Highly original and forward-thinking'
  ],
  'User Experience & Design': [
    'No UI/UX consideration',
    'Some usability but inconsistent',
    'Usable with good structure',
    'Accessible and easy to use',
    'Beautiful, polished, inclusive, engaging'
  ],
  'Feasibility & Real-World Application': [
    'Not feasible or unrealistic',
    'Some potential but not practical',
    'Basic implementation possible',
    'Feasible with refinement',
    'Highly implementable with real impact'
  ]
};

const specialAwards = [
  {
    title: 'Youth Impact Award',
    criteria: [
      ['Social Relevance', 'Addresses pressing community or social issues'],
      ['Community Benefit', 'Demonstrates measurable or envisioned social impact'],
      ['Ethical Responsibility', 'Considers inclusivity, bias, fairness, and ethics in the solution']
    ]
  },
  {
    title: 'Youth Innovation Award',
    criteria: [
      ['Novelty', 'Introduces a new idea or approach not commonly explored'],
      ['Technical Risk', 'Attempts challenging or unusual solutions'],
      ['Creative Exploration', 'Explores AI in unexpected or cross-disciplinary ways']
    ]
  }
];

export default function RubricPage() {
  return (
    <section className="px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-gray-800 pt-10">Judging Rubrics</h1>
        <p className="text-gray-600">
          Each project will be reviewed using the rubric below. Scores range from <strong>0 (Missing)</strong> to <strong>4 (Outstanding)</strong>.
          Overall scores determine medals:
          <strong> Gold (90–100%)</strong>, <strong>Silver (75–89%)</strong>, <strong>Bronze (60–74%)</strong>.
        </p>

        <Tabs defaultValue="general" className="w-full">
          <TabsList>
            <TabsTrigger value="general">General Evaluation</TabsTrigger>
            <TabsTrigger value="special">Special Awards</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="overflow-auto border rounded">
              <table className="min-w-full border text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-gray-800">
                  <tr>
                    <th className="py-2 px-4 border w-1/4">Criteria</th>
                    {levels.map((lvl, i) => (
                      <th key={i} className="py-2 px-4 border">{lvl}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(criteriaMatrix).map(([title, descriptions]) => (
                    <tr key={title}>
                      <td className="py-2 px-4 border font-medium align-top">{title}</td>
                      {descriptions.map((desc, i) => (
                        <td key={i} className="py-2 px-4 border align-top">{desc}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="special">
            {specialAwards.map(({ title, criteria }) => (
              <div key={title} className="mb-10">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                <div className="overflow-auto border rounded">
                  <table className="min-w-full border text-sm text-left text-gray-700">
                    <thead className="bg-gray-100 text-gray-800">
                      <tr>
                        <th className="py-2 px-4 border w-1/3">Criteria</th>
                        <th className="py-2 px-4 border">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criteria.map(([label, desc]) => (
                        <tr key={label}>
                          <td className="py-2 px-4 border font-medium">{label}</td>
                          <td className="py-2 px-4 border">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        <div className="border-t pt-6 text-gray-500 text-sm">
          For any rubric questions, contact <span className="font-medium">general@futureera.foundation</span>.
        </div>
      </div>
    </section>
  );
}