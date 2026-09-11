// Fixed categoryGrowth function - displays current growth properly
function categoryGrowth(profile, category) {
    const sessions = categorySessions(profile, category);
    
    // If no sessions, return 0
    if (sessions.length === 0) return 0;
    
    // If only 1 session, show the score as the growth (from 0% baseline)
    if (sessions.length === 1) {
        return sessions[0].percent || 0;
    }
    
    // Multiple sessions: calculate growth from first to latest
    const first = sessions[0].percent || 0;
    const latest = sessions[sessions.length - 1].percent || 0;
    
    // Absolute growth (simple difference)
    return latest - first;
}