import type { Presentation } from "./types";

export default function generateGoogleCalendarLink(thesis: Presentation): string {
    const startTime = new Date(`${thesis.date}T${thesis.time}`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Add 30 minutes

    const startUTC = startTime.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const endUTC = endTime.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const title = encodeURIComponent(thesis.title);
    const details = encodeURIComponent(`Authors: ${thesis.authors}\nOpponents: ${thesis.opponents}\nSupervisor: ${thesis.supervisor}`);
    const location = encodeURIComponent(thesis.location);

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUTC}/${endUTC}&details=${details}&location=${location}&sf=true&output=xml`;
}

