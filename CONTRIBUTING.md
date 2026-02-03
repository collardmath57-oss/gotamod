# Contributing to GotaMod

Thank you for your interest in contributing to GotaMod! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear title and description
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Browser and Tampermonkey version
- Screenshots if applicable

### Suggesting Features

Feature suggestions are welcome! Please:
- Check if the feature has already been suggested
- Provide a clear description of the feature
- Explain why it would be useful
- Describe how it should work

### Pull Requests

1. Fork the repository
2. Create a new branch for your feature (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style

- Use clear, descriptive variable names
- Add comments for complex logic
- Follow existing code formatting
- Keep functions focused and concise

### Testing

Before submitting a PR:
1. Test the script on gota.io
2. Verify right-click switching works
3. Check keyboard shortcuts function correctly
4. Ensure the visual indicator displays properly
5. Test on multiple browsers (Chrome, Firefox, Edge)

## Development Setup

1. Clone the repository:
```bash
git clone https://github.com/collardmath57-oss/gotamod.git
cd gotamod
```

2. Make your changes to `gotamod.user.js`

3. Test locally by installing the script in Tampermonkey

4. Create the minified version (optional):
```bash
# You can use any JavaScript minifier
```

## Project Structure

```
gotamod/
├── gotamod.user.js    # Main Tampermonkey script
├── gotamod.min.js     # Minified version for CDN
├── index.html         # Installation/demo page
├── package.json       # Project metadata
├── LICENSE            # MIT License
├── README.md          # Main documentation
└── .gitignore         # Git ignore rules
```

## Versioning

We use semantic versioning (MAJOR.MINOR.PATCH):
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for any questions or concerns.

---

Thank you for contributing to GotaMod! 🎮
