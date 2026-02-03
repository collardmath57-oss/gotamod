# Contributing to GotaMod

Thank you for your interest in contributing to GotaMod! This document provides guidelines for contributing to the project.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear, descriptive title
- Steps to reproduce the bug
- Expected behavior
- Actual behavior
- Browser version and Tampermonkey version
- Any error messages from the console

### Suggesting Enhancements

We welcome suggestions! Please open an issue with:
- A clear description of the enhancement
- Why it would be useful
- How it should work
- Any relevant examples

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

## Development Guidelines

### Code Style

- Use clear, descriptive variable names
- Add comments for complex logic
- Follow existing code formatting
- Keep functions small and focused

### Testing

Before submitting a PR:
1. Test the script on gota.io
2. Test both basic and CDN versions
3. Verify right-click switching works
4. Check console for errors
5. Test in different browsers if possible

### Commit Messages

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Keep first line under 72 characters
- Reference issues and pull requests when relevant

## Project Structure

```
gotamod/
├── gotamod.user.js        # Basic Tampermonkey script
├── gotamod-cdn.user.js    # CDN-enabled version
├── inject.js              # CDN-hosted injection code
├── index.html             # Demo/documentation page
├── README.md              # Main documentation
├── CONTRIBUTING.md        # This file
├── LICENSE                # MIT License
└── package.json           # Package metadata
```

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉
