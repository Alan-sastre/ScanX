import re
import math
import mimetypes
from urllib.parse import urlparse
import tldextract

URL_SUSPICIOUS_KEYWORDS = ["login", "verify", "account", "paypal", "secure", "update", "bank", "auth"]

def analyze_url(url: str, virustotal_api_key: str = None) -> dict:
    parsed = urlparse(url)
    domain = parsed.netloc.split(':')[0]
    port = parsed.port
    
    details = []
    danger_score = 0
    threat_type = None
    
    # Check IP as domain
    if re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$", domain):
        danger_score += 4
        details.append("IP address used instead of domain name")
        threat_type = "Phishing/Suspicious"
        
    # Check port
    if port and port not in [80, 443, None]:
        danger_score += 2
        details.append(f"Unusual port used: {port}")
        
    # TLD and subdomains
    extracted = tldextract.extract(url)
    subdomain = extracted.subdomain.lower()
    
    # Count subdomains
    if subdomain.count('.') > 1:
        danger_score += 2
        details.append("Multiple subdomains detected (possible obfuscation)")
        
    # Keywords
    for kw in URL_SUSPICIOUS_KEYWORDS:
        if kw in url.lower():
            danger_score += 3
            details.append(f"Suspicious keyword found: '{kw}'")
            threat_type = "Phishing"
            
    # Check typosquatting
    popular_domains = ["google", "facebook", "paypal", "microsoft", "apple", "amazon"]
    for pd in popular_domains:
        if pd in extracted.domain and pd != extracted.domain:
            danger_score += 5
            details.append(f"Possible typosquatting targeting: {pd}")
            threat_type = "Phishing/Fraud"
            
    # HTTP vs HTTPS
    if parsed.scheme == "http":
        danger_score += 1
        details.append("Uses HTTP instead of HTTPS")
        
    danger_level = min(10, danger_score)
    
    if danger_level >= 7:
        verdict = "Phishing" if threat_type == "Phishing" else "Fraude"
    elif danger_level >= 4:
        verdict = "Sospechoso"
    else:
        verdict = "Seguro"
        threat_type = "Ninguna"
        
    explanation = f"Análisis heurístico completado. Score de riesgo calculado."
    
    return {
        "verdict": verdict,
        "threat_type": threat_type or "Unknown",
        "danger_level": danger_level,
        "explanation": explanation,
        "details": details,
        "virustotal_used": False
    }

def calculate_entropy(data: bytes) -> float:
    if not data:
        return 0.0
    entropy = 0
    for x in range(256):
        p_x = float(data.count(x)) / len(data)
        if p_x > 0:
            entropy += - p_x * math.log(p_x, 2)
    return entropy

def analyze_file(filename: str, content: bytes, content_type: str, virustotal_api_key: str = None) -> dict:
    details = []
    danger_score = 0
    threat_type = None
    
    guessed_type, _ = mimetypes.guess_type(filename)
    if guessed_type and content_type and guessed_type != content_type and "application/octet-stream" not in content_type:
        danger_score += 3
        details.append(f"MIME type mismatch: Ext={guessed_type}, Provided={content_type}")
        
    entropy = calculate_entropy(content)
    details.append(f"File entropy: {entropy:.2f}")
    if entropy > 7.5:
        danger_score += 4
        details.append("High entropy detected (possibly packed or encrypted malware)")
        threat_type = "Ransomware / Packed Malware"
        
    danger_exts = ['.exe', '.bat', '.cmd', '.vbs', '.ps1', '.scr', '.jar', '.apk']
    if any(filename.lower().endswith(ext) for ext in danger_exts):
        danger_score += 3
        details.append("Executable or script file extension")
        
    if b"vbaProject.bin" in content or b"AutoOpen" in content or b"Document_Open" in content:
        danger_score += 5
        details.append("Possible malicious macros detected")
        threat_type = "Macro Malware"
        
    if len(content) > 10 * 1024 * 1024:
        details.append(f"Large file size: {len(content) / (1024*1024):.2f} MB")
        
    danger_level = min(10, danger_score)
    
    if danger_level >= 7:
        verdict = "Malware"
    elif danger_level >= 4:
        verdict = "Sospechoso"
    else:
        verdict = "Limpio"
        threat_type = "Ninguna"
        
    explanation = f"Análisis de archivo basado en extensión, entropía y firmas simples."
    
    return {
        "verdict": verdict,
        "threat_type": threat_type or "Unknown",
        "danger_level": danger_level,
        "explanation": explanation,
        "details": details,
        "virustotal_used": False
    }
