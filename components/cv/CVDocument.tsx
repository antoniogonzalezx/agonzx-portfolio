'use client';

import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
  Font,
  Link,
} from '@react-pdf/renderer';
import { CV } from '../data';

/* ─────────────────────────────────────────────────────────────────
 * CVDocument — agonzx personal CV (single A4 target).
 *
 * Hero band (navy): photo cutout anchored to bottom-left, name +
 * role centred top, contact list bottom-right with breathing room,
 * `agonz{x}` wordmark in white top-right.
 *
 * Body: paper-light. Sections About / Experience / Stack /
 * Education + Languages. No company logos in the PDF (SVG support
 * is unreliable; the user opted out).
 *
 * Fonts: Nohemi + Safiro from /public/fonts (.woff). No Mono.
 * ───────────────────────────────────────────────────────────────── */

const ORIGIN = typeof window !== 'undefined' ? window.location.origin : '';

Font.register({
  family: 'Nohemi',
  fonts: [
    { src: `${ORIGIN}/fonts/Nohemi-Regular.woff`,    fontWeight: 400 },
    { src: `${ORIGIN}/fonts/Nohemi-Bold.woff`,       fontWeight: 700 },
    { src: `${ORIGIN}/fonts/Nohemi-ExtraBold.woff`,  fontWeight: 800 },
  ],
});

Font.register({
  family: 'Safiro',
  fonts: [{ src: `${ORIGIN}/fonts/safiro-medium.woff`, fontWeight: 500 }],
});

/* Disable @react-pdf's default syllable-hyphenation. With this
 * callback returning the whole word, breaks happen only at whitespace
 * — fixes the visible "·- SOLID" wrap from a too-long Skills row. */
Font.registerHyphenationCallback((word: string) => [word]);

// Brand palette
const C = {
  bg:         '#FAFBFD',
  ink:        '#23335C',
  ink2:       '#4E5C84',
  ink3:       '#8590AB',
  line:       '#E5E8F0',
  accent:     '#4F4FFF',
  accentSoft: '#9999FF',
  white:      '#FAFBFD',
};

const styles = StyleSheet.create({
  /* Page-level padding so EVERY page gets margins (page 2 was bleeding
   * to the edges before because padding lived on a body wrapper inside
   * page 1 only). The hero band uses negative margins to escape these
   * page paddings on page 1, achieving full-bleed where needed. */
  page: {
    backgroundColor: C.bg,
    paddingTop:      36,
    paddingBottom:   36,
    paddingLeft:     42,
    paddingRight:    42,
    fontFamily:      'Safiro',
    fontWeight:      500,
    fontSize:        9.4,
    color:           C.ink2,
    lineHeight:      1.5,
  },

  /* ── Hero band ── */
  heroBand: {
    backgroundColor: C.ink,
    // Escape page padding to be full-bleed (page 1 only).
    marginTop:       -36,
    marginLeft:      -42,
    marginRight:     -42,
    marginBottom:    24,
    paddingTop:      28,
    paddingBottom:   0,
    paddingLeft:     42,
    paddingRight:    42,
    color:           C.white,
    position:        'relative',
    height:          175,
  },
  brandWordmark: {
    position:      'absolute',
    top:            22,
    right:          42,
    fontFamily:    'Nohemi',
    fontWeight:    700,
    fontSize:      14,
    color:         C.white,
    letterSpacing: -0.4,
  },
  brandWordmarkAccent: {
    color: C.accentSoft,
  },

  heroRow: {
    flexDirection: 'row',
    height:        '100%',
    gap:           22,
  },
  photoCol: {
    width:         110,
    height:        '100%',
    flexDirection: 'column',
    justifyContent:'flex-end',     // anchor photo to bottom
  },
  photo: {
    width:        110,
    height:       145,
    objectFit:   'cover',
    objectPosition:'top',
  },
  rightCol: {
    flex:           1,
    flexDirection:  'column',
    justifyContent: 'space-between',
    paddingTop:     6,
    paddingBottom:  16,
  },
  name: {
    fontFamily:    'Nohemi',
    fontWeight:    700,
    fontSize:      20,
    color:         C.white,
    letterSpacing: -0.6,
    lineHeight:    1.05,
    marginBottom:  3,
  },
  role: {
    fontSize:    10,
    color:       'rgba(250,251,253,0.85)',
    marginBottom:1,
  },
  location: {
    fontSize: 8.6,
    color:    'rgba(250,251,253,0.6)',
  },

  contactList: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    columnGap:     14,
    rowGap:        2,
    fontSize:      8.4,
    color:         'rgba(250,251,253,0.85)',
  },
  contactItem: {
    fontSize: 8.4,
    color:    'rgba(250,251,253,0.85)',
  },
  contactWeb: {
    fontSize: 8.4,
    color:    C.accentSoft,
  },

  /* ── Section ── */
  sectionTitle: {
    fontFamily:    'Nohemi',
    fontWeight:    700,
    fontSize:      14,
    color:         C.ink,
    letterSpacing: -0.3,
    marginBottom:  9,
  },
  divider: {
    borderBottomWidth: 0.7,
    borderBottomColor: C.line,
    marginVertical:    14,
  },

  summary: {
    fontSize:    9.6,
    lineHeight: 1.55,
    color:       C.ink2,
    marginBottom: 8,
  },

  /* ── Experience ── */
  job: {
    marginBottom: 12,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:    'baseline',
    marginBottom:  2,
  },
  company: {
    fontFamily:    'Nohemi',
    fontWeight:    700,
    fontSize:      12,
    color:         C.ink,
    letterSpacing: -0.2,
  },
  jobDate: {
    fontFamily: 'Safiro',
    fontSize:    8.6,
    color:       C.ink3,
  },
  jobRole: {
    fontFamily: 'Safiro',
    fontWeight: 500,
    fontSize:    9.6,
    color:       C.ink2,
    marginBottom: 5,
  },
  bullet: {
    flexDirection: 'row',
    marginBottom:  3,
    paddingLeft:   2,
  },
  bulletDot: {
    width:    9,
    fontSize: 9,
    color:    C.accent,
    paddingTop: 1,
  },
  bulletText: {
    flex:        1,
    fontSize:    9.2,
    lineHeight: 1.45,
    color:       C.ink2,
  },
  techRow: {
    marginTop:  5,
    fontSize:   8.4,
    color:      C.accent,
    fontFamily: 'Safiro',
    fontWeight: 500,
  },

  /* ── Skills ── */
  skillRow: {
    flexDirection: 'row',
    marginBottom:  5,
    alignItems:    'flex-start',
  },
  skillLabel: {
    width:      102,
    flexShrink:  0,
    fontFamily: 'Nohemi',
    fontWeight: 700,
    fontSize:    9.4,
    color:       C.ink,
    paddingTop:  1,
  },
  skillItems: {
    flex:        1,
    fontSize:    9.2,
    color:       C.ink2,
    lineHeight: 1.5,
  },

  /* ── Education + Languages ── */
  twoCol: {
    flexDirection: 'row',
    gap:           28,
    marginTop:     4,
  },
  twoColLeft:  { flex: 1 },
  twoColRight: { width: 200, flexShrink: 0 },
  eduTitle: {
    fontFamily:    'Nohemi',
    fontWeight:    700,
    fontSize:      10.4,
    color:         C.ink,
    marginBottom:  2,
    letterSpacing: -0.2,
  },
  eduMeta: {
    fontSize: 9,
    color:    C.ink3,
  },
  langRow: {
    flexDirection: 'row',
    justifyContent:'space-between',
    marginBottom:  4,
    fontSize:      9.4,
    color:         C.ink2,
  },
  langName: {
    fontFamily: 'Nohemi',
    fontWeight: 700,
    fontSize:   9.6,
    color:      C.ink,
  },
});

export default function CVDocument() {
  return (
    <Document
      author={CV.name}
      title={`${CV.name} — ${CV.role}`}
      subject="Resume"
      keywords="iOS Engineer, Swift, SwiftUI, Senior, Spain, Remote, AI Agents, Claude Code, Codex, UserTesting, XING"
    >
      <Page size="A4" style={styles.page}>
        {/* ── Hero band ── */}
        <View style={styles.heroBand}>
          <Text style={styles.brandWordmark}>
            agonz<Text style={styles.brandWordmarkAccent}>{'{x}'}</Text>
          </Text>

          <View style={styles.heroRow}>
            <View style={styles.photoCol}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image src={`${ORIGIN}/profile.png`} style={styles.photo} />
            </View>

            <View style={styles.rightCol}>
              <View>
                <Text style={styles.name}>{CV.name}</Text>
                <Text style={styles.role}>{CV.role}</Text>
                <Text style={styles.location}>{CV.location}</Text>
              </View>

              <View style={styles.contactList}>
                <Link src={`mailto:${CV.contact.email}`} style={{ ...styles.contactItem, textDecoration: 'none' }}>
                  {CV.contact.email}
                </Link>
                <Text style={styles.contactItem}>{CV.contact.phone}</Text>
                <Link src={`https://${CV.contact.linkedin}`} style={{ ...styles.contactItem, textDecoration: 'none' }}>
                  {CV.contact.linkedin}
                </Link>
                <Link src={`https://${CV.contact.github}`} style={{ ...styles.contactItem, textDecoration: 'none' }}>
                  {CV.contact.github}
                </Link>
                <Link src={`https://${CV.contact.website}`} style={{ ...styles.contactWeb, textDecoration: 'none' }}>
                  {CV.contact.website}
                </Link>
              </View>
            </View>
          </View>
        </View>

        {/* ── Body — content directly on Page so padding applies per page ── */}
        <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.summary}>{CV.summary}</Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Experience</Text>

          {CV.experience.map((job) => (
            <View key={job.company} style={styles.job} wrap={false}>
              <View style={styles.jobHeader}>
                <Text style={styles.company}>{job.company}</Text>
                <Text style={styles.jobDate}>{job.date}</Text>
              </View>
              <Text style={styles.jobRole}>{job.role}</Text>
              {job.bullets.map((b, i) => (
                <View key={i} style={styles.bullet}>
                  <Text style={styles.bulletDot}>·</Text>
                  <Text style={styles.bulletText}>{b}</Text>
                </View>
              ))}
              {job.tech?.length > 0 && (
                <Text style={styles.techRow}>{job.tech.join('   ·   ')}</Text>
              )}
            </View>
          ))}

          <View style={styles.divider} />

        <Text style={styles.sectionTitle}>Skills</Text>
        <View>
          {CV.skills.map((s) => (
            <View key={s.label} style={styles.skillRow}>
              <Text style={styles.skillLabel}>{s.label}</Text>
              <Text style={styles.skillItems}>{s.items.join('   ·   ')}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.twoCol}>
          <View style={styles.twoColLeft}>
            <Text style={styles.sectionTitle}>Education</Text>
            {CV.education.map((e) => (
              <View key={e.school} style={{ marginBottom: 4 }}>
                <Text style={styles.eduTitle}>{e.title}</Text>
                <Text style={styles.eduMeta}>
                  {e.school} · {e.date}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.twoColRight}>
            <Text style={styles.sectionTitle}>Languages</Text>
            {CV.languages.map((l) => (
              <View key={l.name} style={styles.langRow}>
                <Text style={styles.langName}>{l.name}</Text>
                <Text>{l.level}</Text>
              </View>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  );
}
