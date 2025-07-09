interface TrafficSignSVGProps {
  type: string
  name: string
  className?: string
}

export default function TrafficSignSVG({ type, name, className = "w-20 h-20" }: TrafficSignSVGProps) {
  const getSignSVG = () => {
    // Gebodsborden (Blue circular)
    if (name.includes("rechtsaf")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0066cc" stroke="#fff" strokeWidth="3" />
          <path
            d="M30 50 L60 50 L55 45 M60 50 L55 55"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )
    }

    if (name.includes("linksaf")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0066cc" stroke="#fff" strokeWidth="3" />
          <path
            d="M70 50 L40 50 L45 45 M40 50 L45 55"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )
    }

    if (name.includes("rechtdoor")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0066cc" stroke="#fff" strokeWidth="3" />
          <path
            d="M50 70 L50 30 L45 35 M50 30 L55 35"
            stroke="white"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      )
    }

    if (name.includes("Fietspad")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#0066cc" stroke="#fff" strokeWidth="3" />
          <circle cx="35" cy="65" r="8" fill="none" stroke="white" strokeWidth="2" />
          <circle cx="65" cy="65" r="8" fill="none" stroke="white" strokeWidth="2" />
          <path d="M35 57 L50 35 L65 57" stroke="white" strokeWidth="2" fill="none" />
          <circle cx="50" cy="35" r="3" fill="white" />
        </svg>
      )
    }

    // Verbodsborden (Red circular with white background)
    if (name.includes("Gesloten voor alle verkeer")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="white" stroke="#cc0000" strokeWidth="6" />
          <rect x="20" y="45" width="60" height="10" fill="#cc0000" />
        </svg>
      )
    }

    if (name.includes("Maximum snelheid")) {
      const speed = name.includes("30") ? "30" : name.includes("50") ? "50" : "70"
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="white" stroke="#cc0000" strokeWidth="6" />
          <text x="50" y="60" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#cc0000">
            {speed}
          </text>
        </svg>
      )
    }

    if (name.includes("Parkeerverbod")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="white" stroke="#cc0000" strokeWidth="6" />
          <text x="50" y="60" textAnchor="middle" fontSize="32" fontWeight="bold" fill="#cc0000">
            P
          </text>
          <line x1="25" y1="25" x2="75" y2="75" stroke="#cc0000" strokeWidth="6" />
        </svg>
      )
    }

    // Waarschuwingsborden (Red triangular)
    if (name.includes("bocht naar rechts")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 90,80 10,80" fill="white" stroke="#cc0000" strokeWidth="4" />
          <path d="M30 50 Q50 30 70 50" stroke="#cc0000" strokeWidth="4" fill="none" />
          <path d="M65 45 L70 50 L65 55" stroke="#cc0000" strokeWidth="3" fill="none" />
        </svg>
      )
    }

    if (name.includes("bocht naar links")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 90,80 10,80" fill="white" stroke="#cc0000" strokeWidth="4" />
          <path d="M70 50 Q50 30 30 50" stroke="#cc0000" strokeWidth="4" fill="none" />
          <path d="M35 45 L30 50 L35 55" stroke="#cc0000" strokeWidth="3" fill="none" />
        </svg>
      )
    }

    if (name.includes("Kinderen")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 90,80 10,80" fill="white" stroke="#cc0000" strokeWidth="4" />
          <circle cx="45" cy="35" r="6" fill="#cc0000" />
          <path d="M45 41 L45 60 M40 50 L50 50 M42 60 L42 70 M48 60 L48 70" stroke="#cc0000" strokeWidth="2" />
        </svg>
      )
    }

    if (name.includes("Kruispunt")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <polygon points="50,10 90,80 10,80" fill="white" stroke="#cc0000" strokeWidth="4" />
          <path d="M30 50 L70 50 M50 30 L50 70" stroke="#cc0000" strokeWidth="4" />
        </svg>
      )
    }

    // Voorrangsborden
    if (name.includes("Voorrang verlenen")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <polygon points="50,80 90,20 10,20" fill="white" stroke="#cc0000" strokeWidth="4" />
        </svg>
      )
    }

    if (name.includes("Stop")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <polygon
            points="30,15 70,15 85,30 85,70 70,85 30,85 15,70 15,30"
            fill="#cc0000"
            stroke="#fff"
            strokeWidth="2"
          />
          <text x="50" y="60" textAnchor="middle" fontSize="16" fontWeight="bold" fill="white">
            STOP
          </text>
        </svg>
      )
    }

    if (name.includes("Voorrangsweg")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <polygon points="50,15 75,50 50,85 25,50" fill="#ffcc00" stroke="#fff" strokeWidth="3" />
        </svg>
      )
    }

    // Informatieborden (Blue square)
    if (name.includes("Parkeerplaats")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <rect x="10" y="10" width="80" height="80" fill="#0066cc" stroke="#fff" strokeWidth="2" />
          <text x="50" y="65" textAnchor="middle" fontSize="48" fontWeight="bold" fill="white">
            P
          </text>
        </svg>
      )
    }

    if (name.includes("Benzinestation")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <rect x="10" y="10" width="80" height="80" fill="#0066cc" stroke="#fff" strokeWidth="2" />
          <rect x="30" y="35" width="25" height="30" fill="white" />
          <circle cx="65" cy="50" r="8" fill="white" />
          <path d="M55 50 L65 50" stroke="#0066cc" strokeWidth="3" />
        </svg>
      )
    }

    if (name.includes("Ziekenhuis")) {
      return (
        <svg viewBox="0 0 100 100" className={className}>
          <rect x="10" y="10" width="80" height="80" fill="#0066cc" stroke="#fff" strokeWidth="2" />
          <path d="M50 30 L50 70 M30 50 L70 50" stroke="white" strokeWidth="8" />
        </svg>
      )
    }

    // Default fallback
    return (
      <svg viewBox="0 0 100 100" className={className}>
        <circle cx="50" cy="50" r="45" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="2" />
        <text x="50" y="55" textAnchor="middle" fontSize="12" fill="#6b7280">
          ?
        </text>
      </svg>
    )
  }

  return getSignSVG()
}
