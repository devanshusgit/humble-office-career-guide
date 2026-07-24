import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import { CareerGuideResult } from '../gemini/schema';

import path from 'path';

Font.register({
  family: 'Noto Sans Devanagari',
  fonts: [
    { src: path.join(process.cwd(), 'public', 'fonts', 'NotoSansDevanagari-Regular.ttf') },
    { src: path.join(process.cwd(), 'public', 'fonts', 'NotoSansDevanagari-Regular.ttf'), fontWeight: 'bold' },
    { src: path.join(process.cwd(), 'public', 'fonts', 'NotoSansDevanagari-Regular.ttf'), fontStyle: 'italic' },
    { src: path.join(process.cwd(), 'public', 'fonts', 'NotoSansDevanagari-Regular.ttf'), fontWeight: 'bold', fontStyle: 'italic' },
  ]
});

// Styles matching the premium navy/indigo brand design
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Noto Sans Devanagari',
    fontSize: 11,
    backgroundColor: '#ffffff',
    color: '#1e293b', // slate-800
  },
  coverPage: {
    padding: 40,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    color: '#1e293b',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    color: '#312e81', // indigo-900
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
    textAlign: 'center',
    color: '#312e81',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#475569',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    color: '#4f46e5', // indigo-600
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
    lineHeight: 1.5,
    color: '#334155',
  },
  listItem: {
    fontSize: 12,
    marginBottom: 5,
    paddingLeft: 10,
    color: '#334155',
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 30,
    objectFit: 'cover',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: 8,
    fontFamily: 'Noto Sans Devanagari',
  },
  card: {
    backgroundColor: '#f8fafc',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },
  cardTitle: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardScore: {
    fontSize: 12,
    color: '#6366f1',
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

interface CareerGuidePDFProps {
  guide: CareerGuideResult;
  photoUrl?: string;
  submissionId: string;
}

export const CareerGuidePDF: React.FC<CareerGuidePDFProps> = ({
  guide,
  photoUrl,
  submissionId,
}) => (
  <Document>
    {/* Cover Page */}
    <Page size="A4" style={styles.coverPage}>
      <Text style={styles.header}>Humble Office</Text>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      {photoUrl && <Image src={photoUrl} style={styles.photo} />}
      <Text style={styles.title}>Personalized Career Guide</Text>
      <Text style={styles.subtitle}>Prepared for {guide.studentName}</Text>
      <Text style={{ fontSize: 12, color: '#64748b', marginTop: 40 }}>
        Generated on: {guide.generatedDate}
      </Text>
      <Text style={{ fontSize: 10, color: '#94a3b8', marginTop: 10 }}>
        Ref: {submissionId}
      </Text>
      <Text style={{ fontSize: 10, color: '#94a3b8', position: 'absolute', bottom: 30, textAlign: 'center' }}>
        *This is AI-assisted guidance, not a guaranteed admission or career outcome.
      </Text>
    </Page>

    {/* Content Pages */}
    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>Executive Summary</Text>
      <Text style={styles.text}>{guide.executiveSummary}</Text>

      <Text style={styles.sectionTitle}>Profile Snapshot</Text>
      <Text style={styles.text}>Education Stage: {guide.profileSnapshot.educationStage}</Text>
      <Text style={styles.text}>Interests: {guide.profileSnapshot.majorInterests.join(', ')}</Text>
      <Text style={styles.text}>Strengths: {guide.profileSnapshot.keyStrengths.join(', ')}</Text>

      <Text style={styles.sectionTitle}>Recommended Career Paths</Text>
      {guide.recommendedCareerPaths.map((career, idx) => (
        <View key={idx} style={styles.card} wrap={false}>
          <Text style={styles.cardTitle}>{career.careerTitle}</Text>
          <Text style={styles.cardScore}>Fit Level: {career.fitLevel} ({career.fitScore}/100)</Text>
          <Text style={styles.text}>{career.overview}</Text>
          <Text style={{ ...styles.text, fontWeight: 'bold' }}>Why it matches:</Text>
          {career.whyItMatches.map((reason, i) => (
            <Text key={i} style={styles.listItem}>• {reason}</Text>
          ))}
        </View>
      ))}
      <Text style={styles.footer} fixed>Humble Office Career Guide | {guide.studentName}</Text>
    </Page>

    <Page size="A4" style={styles.page}>
      <Text style={styles.sectionTitle}>90-Day Action Plan</Text>
      {guide.ninetyDayActionPlan.map((plan, idx) => (
        <View key={idx} style={{ marginBottom: 15 }} wrap={false}>
          <Text style={{ ...styles.text, fontWeight: 'bold' }}>{plan.period}</Text>
          {plan.actions.map((act, i) => (
             <Text key={i} style={styles.listItem}>• {act}</Text>
          ))}
          <Text style={{ ...styles.text, fontStyle: 'italic', marginTop: 5 }}>Outcome: {plan.expectedOutcome}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Your Questions Answered</Text>
      {guide.questionsAnswered.map((qa, idx) => (
        <View key={idx} style={{ marginBottom: 15 }} wrap={false}>
          <Text style={{ ...styles.text, fontWeight: 'bold' }}>Q: {qa.question}</Text>
          <Text style={styles.text}>A: {qa.answer}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Encouragement & Disclaimer</Text>
      <Text style={styles.text}>{guide.encouragementNote}</Text>
      <Text style={{ ...styles.text, fontSize: 10, color: '#64748b', marginTop: 20 }}>
        {guide.disclaimer}
      </Text>
      <Text style={styles.footer} fixed>Humble Office Career Guide | {guide.studentName}</Text>
    </Page>
  </Document>
);
