# Security Policy

## Reporting Security Vulnerabilities

**⚠️ Please DO NOT open a public GitHub issue for security vulnerabilities.**

If you discover a security vulnerability, please email:

📧 **[ernestzdunczyk@gmail.com](mailto:ernestzdunczyk@gmail.com)** with subject line: `[SECURITY] EzPortfolio Vulnerability`

**Include:**
- Description of the vulnerability
- Steps to reproduce (if applicable)
- Potential impact
- Your name (for credit in fix)

**Response Time:** We aim to respond within 48 hours.

---

## Security Best Practices

### For Users

✅ **DO:**
- Use HTTPS in production (enabled by default with Docker setup)
- Keep dependencies updated
- Use strong, unique passwords
- Enable email verification for accounts
- Change default database credentials immediately
- Keep environment variables (`.env`) private

❌ **DON'T:**
- Commit `.env` files to repository
- Use default credentials in production
- Run with `DEBUG=True` in production
- Share JWT tokens or session cookies
- Store sensitive data in frontend

### For Developers

#### Authentication

```python
# ✅ GOOD: Use JWT with short expiration
from rest_framework_simplejwt.tokens import RefreshToken

token = RefreshToken.for_user(user)
# Access token expires in 5 minutes
# Refresh token expires in 24 hours
```

#### SQL Injection Prevention

```python
# ✅ GOOD: Use Django ORM (parameterized queries)
User.objects.filter(username=username)

# ❌ BAD: Raw SQL string concatenation
User.objects.raw(f"SELECT * FROM auth_user WHERE username = '{username}'")
```

#### XSS Prevention

```javascript
// ✅ GOOD: React escapes by default
<div>{userInput}</div>

// ❌ BAD: Dangerous HTML rendering
<div dangerouslySetInnerHTML={{ __html: userInput }}></div>
```

#### CSRF Protection

```python
# ✅ GOOD: Django CSRF middleware enabled by default
# In settings.py:
MIDDLEWARE = [
    'django.middleware.csrf.CsrfViewMiddleware',
]

# ✅ GOOD: Include CSRF token in forms
<form method="post">
    {% csrf_token %}
    ...
</form>
```

#### Secure Headers

```python
# ✅ GOOD: Add security headers in settings.py
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
```

#### Password Security

```python
# ✅ GOOD: Use Django's built-in password hashing
from django.contrib.auth.hashers import make_password

password_hash = make_password(password)

# ✅ GOOD: Validate password strength
from django.contrib.auth.password_validation import validate_password

try:
    validate_password(password, user=user)
except ValidationError as e:
    return error_response(e.messages)
```

#### Secrets Management

```python
# ✅ GOOD: Use environment variables
import os
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
DB_PASSWORD = os.getenv('POSTGRES_PASSWORD')

# ❌ BAD: Hardcoded secrets
SECRET_KEY = 'super-secret-key'
```

---

## Production Deployment Checklist

Before deploying to production:

- [ ] `DEBUG = False` in Django settings
- [ ] `SECRET_KEY` changed and stored in `.env`
- [ ] All default credentials updated (database, email, etc.)
- [ ] HTTPS/SSL certificates installed (Certbot)
- [ ] Database password is strong (minimum 16 characters)
- [ ] Email SMTP credentials configured
- [ ] ALLOWED_HOSTS configured correctly
- [ ] CSRF_TRUSTED_ORIGINS set for frontend domain
- [ ] Security headers enabled (HSTS, CSP, X-Frame-Options)
- [ ] Rate limiting implemented on API endpoints
- [ ] Logging configured for error tracking
- [ ] Database backups automated
- [ ] Firewall rules configured
- [ ] Regular dependency updates scheduled
- [ ] Security scanning enabled (pip-audit, npm audit)

---

## Security Scanning

### Backend (Python)

```bash
# Check for known vulnerabilities
pip install pip-audit
pip-audit

# Security linting
pip install bandit
bandit -r backend/
```

### Frontend (JavaScript)

```bash
# Check for known vulnerabilities
npm audit

# Fix automatically if possible
npm audit fix
```

---

## Dependency Security

### Keep Dependencies Updated

```bash
# Backend
pip list --outdated
pip install --upgrade pip setuptools wheel

# Frontend
npm outdated
npm update
```

### Automated Checking

GitHub enables **Dependabot** by default for:
- Python dependencies (requirements.txt)
- JavaScript dependencies (package.json)

Check **Insights → Dependency graph** in GitHub repo settings.

---

## Incident Response

If a vulnerability is discovered:

1. **Assess severity** (Critical, High, Medium, Low)
2. **Develop patch** in private branch
3. **Test thoroughly**
4. **Release security update** with clear advisory
5. **Notify users** if user action required
6. **Credit researcher** (with permission)

---

## Compliance

This project follows:

- **OWASP Top 10** security recommendations
- **Django security** best practices
- **React** security guidelines
- **Common Vulnerability Enumeration (CVE)** standards

---

## Security Resources

- [OWASP Security Cheat Sheets](https://cheatsheetseries.owasp.org/)
- [Django Security Documentation](https://docs.djangoproject.com/en/stable/topics/security/)
- [React Security Documentation](https://react.dev/learn/security)
- [npm Security Advisories](https://www.npmjs.com/advisories)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework)

---

## Questions?

For security-related questions that aren't vulnerabilities, open a discussion issue with the `security` label.

**Thank you for helping keep EzPortfolio secure!** 🔐
