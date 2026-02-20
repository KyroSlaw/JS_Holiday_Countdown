export const formatNumber = (num) => String(num).padStart(2, '0');

export function calculateTimeRemaining(targetDate) {
    const diff = new Date(targetDate) - new Date();
    
    if (diff <= 0) return null;

    return {
        days: formatNumber(Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: formatNumber(Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: formatNumber(Math.floor((diff / 1000 / 60) % 60)),
        seconds: formatNumber(Math.floor((diff / 1000) % 60))
    };
} //snad je ten bonus správně Hána sensei
//PS: neumím na boha matiku tak snad to je správně XD
