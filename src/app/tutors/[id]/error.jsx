'use client';
import { useEffect, useState } from "react";

const styles = {
   
    main: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "4rem 2rem",
        background: "#FDFAF4",
        minHeight: "calc(100vh - 120px)",
        position: "relative",
        overflow: "hidden",
    },
    orbRed: {
        position: "absolute",
        top: -100, right: -100,
        width: 380, height: 380,
        background: "#FDECEA",
        borderRadius: "50%",
        pointerEvents: "none",
    },
    orbGold: {
        position: "absolute",
        bottom: -80, left: -80,
        width: 260, height: 260,
        background: "#FEF5DF",
        borderRadius: "50%",
        pointerEvents: "none",
    },
    card: {
        position: "relative",
        zIndex: 1,
        background: "#fff",
        borderRadius: 24,
        border: "1.5px solid #E4DDD0",
        padding: "4rem 3.5rem",
        maxWidth: 520,
        width: "100%",
        textAlign: "center",
        boxShadow: "0 12px 48px rgba(13,27,42,0.09)",
    },
    iconRing: {
        width: 88, height: 88,
        margin: "0 auto 1.75rem",
        background: "#FDECEA",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "6px solid #fce8e6",
    },
    code: {
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "6rem",
        fontWeight: 900,
        color: "#C0392B",
        lineHeight: 1,
        letterSpacing: "-4px",
        marginBottom: "0.25rem",
    },
    title: {
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: "1.6rem",
        fontWeight: 700,
        color: "#0D1B2A",
        marginBottom: "0.85rem",
    },
    desc: {
        color: "#6B7A8D",
        fontSize: "0.95rem",
        lineHeight: 1.75,
        marginBottom: "2rem",
    },
    actions: { display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" },
    btnPrimary: {
        background: "#0D1B2A",
        color: "#fff",
        padding: "0.8rem 1.85rem",
        borderRadius: 10,
        fontFamily: "'Hind Siliguri', sans-serif",
        fontSize: "0.95rem",
        fontWeight: 600,
        cursor: "pointer",
        border: "none",
        transition: "background 0.2s, transform 0.15s",
    },
    btnOutline: {
        background: "transparent",
        color: "#0D1B2A",
        padding: "0.8rem 1.85rem",
        borderRadius: 10,
        fontFamily: "'Hind Siliguri', sans-serif",
        fontSize: "0.95rem",
        fontWeight: 600,
        cursor: "pointer",
        border: "1.5px solid #E4DDD0",
        transition: "border-color 0.2s, transform 0.15s",
    },
    tip: {
        marginTop: "2rem",
        padding: "1rem 1.25rem",
        background: "#fffbf0",
        borderLeft: "3px solid #E8A020",
        borderRadius: "0 8px 8px 0",
        fontSize: "0.85rem",
        color: "#7a5c10",
        textAlign: "left",
        lineHeight: 1.6,
    },
    divider: {
        margin: "2rem 0 1.5rem",
        display: "flex",
        alignItems: "center",
        gap: 12,
        color: "#6B7A8D",
        fontSize: "0.8rem",
        position: "relative",
    },
    dividerLine: { flex: 1, height: 1, background: "#E4DDD0" },
    detailBox: {
        background: "#fafafa",
        border: "1px solid #E4DDD0",
        borderRadius: 10,
        padding: "1rem",
        textAlign: "left",
        fontSize: "0.8rem",
        color: "#6B7A8D",
    },
    inlineCode: {
        fontFamily: "monospace",
        background: "#f0ede8",
        padding: "1px 5px",
        borderRadius: 3,
        fontSize: "0.78rem",
        color: "#C0392B",
    },
   
};

export default function ErrorPage() {
    const [now, setNow] = useState("");
    const [path, setPath] = useState("/");

    useEffect(() => {
        setNow(new Date().toLocaleString("bn-BD"));
        setPath(window.location.pathname || "/dashboard");
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Playfair+Display:wght@700;900&display=swap";
        document.head.appendChild(link);
    }, []);

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "'Hind Siliguri', sans-serif" }}>

            {/* MAIN */}
            <main style={styles.main}>
                <div style={styles.orbRed} />
                <div style={styles.orbGold} />

                <div style={styles.card}>
                    {/* Icon */}
                    <div style={styles.iconRing}>
                        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
                            <circle cx="19" cy="19" r="17" stroke="#C0392B" strokeWidth="2.5" />
                            <path d="M19 11v9" stroke="#C0392B" strokeWidth="2.5" strokeLinecap="round" />
                            <circle cx="19" cy="26.5" r="1.5" fill="#C0392B" />
                        </svg>
                    </div>

                    <div style={styles.code}>500</div>
                    <div style={styles.title}>সার্ভারে সমস্যা হয়েছে</div>
                    <p style={styles.desc}>
                        দুঃখিত! আমাদের সার্ভারে একটি অপ্রত্যাশিত সমস্যা হয়েছে।
                        আপনার পেজটি এই মুহূর্তে লোড করা সম্ভব হচ্ছে না।
                        আমরা এটি দ্রুত ঠিক করতে কাজ করছি।
                    </p>

                    <div style={styles.actions}>
                        <button style={styles.btnPrimary} onClick={() => window.location.reload()}>
                            🔄 আবার চেষ্টা করুন
                        </button>
                        <button style={styles.btnOutline} onClick={() => (window.location.href = "/")}>
                            🏠 হোমে যান
                        </button>
                    </div>

                    <div style={styles.tip}>
                        💡 <strong>সাহায্য দরকার?</strong> সমস্যা চলতে থাকলে আমাদের সাপোর্ট টিমে যোগাযোগ করুন —{" "}
                        <strong>support@shikkhabd.com</strong> অথবা <strong>01700-000000</strong>
                    </div>

                    {/* Divider */}
                    <div style={styles.divider}>
                        <div style={styles.dividerLine} />
                        <span>ত্রুটির বিস্তারিত</span>
                        <div style={styles.dividerLine} />
                    </div>

                    <div style={styles.detailBox}>
                        <p style={{ marginBottom: 4 }}>
                            ❌ Error Code: <code style={styles.inlineCode}>INTERNAL_SERVER_ERROR</code>
                        </p>
                        <p style={{ marginBottom: 4 }}>
                            🕐 সময়: <code style={styles.inlineCode}>{now}</code>
                        </p>
                        <p>
                            🔗 Path: <code style={styles.inlineCode}>{path}</code>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}