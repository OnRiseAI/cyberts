export const brand = {
  name: "CyberTS",
  tagline: "Proactive Data Defence",
  parent: "AOF Group",
  colors: {
    navy: "#0A1F44",
    lime: "#A4FF00",
    green: "#00FF88",
    gold: "#bf8900",
    goldHi: "#d9a010",
    carbon: "#121212",
    soft: "#F5F5F5",
  },
  gradients: {
    shield: "linear-gradient(135deg, #A4FF00 0%, #00FF88 50%, #0A1F44 100%)",
    page: "linear-gradient(180deg, #0A1F44 0%, #121212 100%)",
    gold: "linear-gradient(135deg, #bf8900 0%, #d9a010 100%)",
  },
  // TODO(CONFIRM): Replace these placeholder accreditation labels with the exact
  // certifications CyberTS actually holds (membership body + registration number).
  credentials: [
    "CREST Accredited",
    "ISO 27001 Certified",
    "Cyber Essentials Plus",
    "UK SOC · 24/7",
    "AOF Group · UK",
  ],
  sectors: [
    {
      id: "medical",
      name: "Medical & Biotech",
      copy: "Sensitive patient records, research IP, and regulated clinical systems under one pane of glass.",
      regulations: "NHS DSP Toolkit · UK GDPR · ISO 27001 · MHRA GxP",
      threat:
        "Ransomware that halts clinical trials and exfiltration of research IP — both trigger regulator notification inside 72 hours and can invalidate years of trial data.",
    },
    {
      id: "legal",
      name: "Legal & Finance",
      copy: "Privileged client data, live deal rooms, and settlement rails that cannot tolerate downtime.",
      regulations: "SRA Guidance · FCA Operational Resilience · ISO 27001 · PCI DSS 4.0",
      threat:
        "Business email compromise and M&A-phase intrusions — attackers sit inside privileged conversations for weeks before redirecting settlement wires or leaking deal intelligence.",
    },
    {
      id: "defence",
      name: "Defence & Government",
      copy: "Classified supply-chain contractors, military systems, and export-controlled technology.",
      regulations: "DEFCON 658 · Cyber Essentials Plus · ISO 27001 · NATO NISP",
      threat:
        "Nation-state reconnaissance against tier-2 and tier-3 suppliers — the MoD's weakest link is almost never the MoD itself, it is the contractor two steps removed.",
    },
    {
      id: "banking",
      name: "Banking & Infrastructure",
      copy: "Payment rails, core banking systems, and the operational technology behind critical national infrastructure.",
      regulations: "DORA · PCI DSS 4.0 · NIS2 · PRA Operational Resilience",
      threat:
        "Payment-rail manipulation and DDoS-for-extortion — minutes of downtime now carry statutory reporting obligations and multi-million-pound service-credit exposure.",
    },
  ],
  pipeline: [
    {
      id: "audit",
      label: "Audit",
      copy: "Identify vulnerabilities",
      detail:
        "A forensic sweep of your estate — external attack surface, internal network, cloud posture, endpoint fleet, identity plane, third-party integrations. Nothing is assumed, nothing is taken on trust from your existing tooling.",
      deliverables: "Vulnerability register · Attack-path map · Risk heatmap · Executive brief",
      timeline: "2–4 weeks",
    },
    {
      id: "secure",
      label: "Secure",
      copy: "Fortify infrastructure",
      detail:
        "Remediation and architectural hardening prioritised by the audit. Patch campaigns, CIS-benchmarked configuration, identity segmentation, and Zero Trust controls where the environment warrants. We work alongside your IT team or take full ownership — your call.",
      deliverables: "Hardening runbook · Change log · Before-and-after posture report",
      timeline: "4–12 weeks",
    },
    {
      id: "certify",
      label: "Certify",
      copy: "Align UK/EU regulations",
      detail:
        "The certification path your sector demands — Cyber Essentials Plus, ISO 27001, SOC 2, NIS2 readiness, DORA for financial services, PCI DSS 4.0 for payments, NHS DSP Toolkit for health. Gap analysis, evidence collection, internal audit, external audit support.",
      deliverables: "Gap analysis · Evidence pack · Audit-ready ISMS · External auditor liaison",
      timeline: "3–9 months",
    },
    {
      id: "insure",
      label: "Insure",
      copy: "Enable insurability",
      detail:
        "Cyber insurance premiums have climbed steeply and underwriters now reject applicants who cannot evidence MFA, EDR, immutable backups, and tested incident response. We prepare your environment — and the paperwork — to satisfy the leading UK and Lloyd's of London cyber markets.",
      deliverables: "Underwriter evidence pack · Controls attestation · Premium-reduction report",
      timeline: "2–6 weeks",
    },
    {
      id: "monitor",
      label: "Monitor",
      copy: "Maintain ongoing defence",
      detail:
        "24/7/365 monitoring from our UK SOC. Managed detection and response, threat intelligence, EDR, NDR, SIEM — tuned to your threat model, not a vendor default. A named incident lead, contractual SLAs, board-ready reporting. The first call when something moves in the night.",
      deliverables: "24/7 SOC · Named incident lead · Monthly board report · Quarterly CISO review",
      timeline: "Ongoing",
    },
  ],
  pillars: [
    {
      label: "Accredited",
      copy:
        "Every methodology is mapped to recognised frameworks before we touch your environment. Penetration testing under CREST-aligned rules of engagement. Management systems aligned to ISO 27001. Controls evidenced against UK regulator expectations — not marketing promises.",
    },
    {
      label: "Bespoke",
      copy:
        "No off-the-shelf playbooks. We map your actual systems, your actual threat surface, your actual regulators — then build a defence that fits only you. Two clients in the same sector never receive the same engagement, because no two estates are the same.",
    },
    {
      label: "Proactive",
      copy:
        "We hunt for the intrusion you have not detected yet. Continuous threat-hunting across endpoint, network, and identity planes — not passive monitoring. The industry average dwell time is measured in weeks. We measure ours in hours.",
    },
  ],
  value: [
    {
      label: "Detect threats faster",
      detail:
        "Hours to first alert on high-signal intrusions, against an industry mean measured in weeks. Continuous hunting, not passive dashboards.",
    },
    {
      label: "Respond more intelligently",
      detail:
        "A named incident lead on the end of a direct line — not a ticket queue. Post-incident review with forensic evidence, root cause, and a hardening plan, every time.",
    },
    {
      label: "Defend with greater strength",
      detail:
        "Layered controls — EDR, NDR, SIEM, identity segmentation, Zero Trust — tuned to your threat model. Controls that compound, so a single failure is never catastrophic.",
    },
    {
      label: "Mitigate risks before they arise",
      detail:
        "Quarterly threat modelling against your live attack surface, informed by intelligence from our SOC and public-sector advisories. Risks are ranked, budgeted, and retired on a schedule you own.",
    },
    {
      label: "Protect data, IP, and systems",
      detail:
        "UK-resident SOC. UK-based analysts. No offshoring, no follow-the-sun handoffs. Your data stays in UK jurisdiction, under UK DPA and UK GDPR — the posture your legal team expects.",
    },
    {
      label: "Align with UK & EU regulations",
      detail:
        "ISO 27001, Cyber Essentials Plus, NIS2, DORA, PCI DSS 4.0, UK GDPR — audit-ready, board-defensible, insurer-accepted. The regulatory workload moves from your team to ours.",
    },
    {
      label: "Build resilience across operations",
      detail:
        "Incident response plans, tabletop exercises, recovery playbooks — tested on a cadence, so the first time your team runs them is not during the breach. Resilience is a rehearsal, not a document.",
    },
  ],
} as const;
