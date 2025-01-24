Statamic.booting(() => {
    const { Mark } = Statamic.$bard.tiptap.core;

    const LanguageMark = Mark.create({
        name: 'language',
        addAttributes() {
            return {
                lang: {
                    default: 'en'
                }
            };
        },
        parseHTML() {
            return [
                {
                    tag: 'span[lang]',
                    getAttrs: dom => ({
                        lang: dom.getAttribute('lang')
                    })
                }
            ];
        },
        renderHTML({ HTMLAttributes }) {
            return [
                'span',
                {
                    ...HTMLAttributes,
                    'lang': HTMLAttributes.lang
                },
                0
            ];
        },
        addCommands() {
            return {
                setLanguage: attributes => ({ chain }) => {
                    return chain()
                        .setMark(this.name, attributes)
                        .run()
                },
                removeLanguage: () => ({ chain }) => {
                    return chain()
                        .unsetMark(this.name)
                        .run()
                }
            }
        }
    });

    // Register the extension with Bard
    Statamic.$bard.addExtension(() => LanguageMark);

    let activeMenu = null;

    // Register the button
    Statamic.$bard.buttons((buttons, button) => {
        return button({
            name: 'language',
            text: 'Language',
            html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" class="w-4 h-4">
                <path fill="currentColor" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-2.29-2.333A17.9 17.9 0 0 1 8.027 13H4.062a8.008 8.008 0 0 0 5.648 6.667zM10.03 13c.151 2.439.848 4.73 1.97 6.752A15.905 15.905 0 0 0 13.97 13h-3.94zm9.908 0h-3.965a17.9 17.9 0 0 1-1.683 6.667A8.008 8.008 0 0 0 19.938 13zM4.062 11h3.965A17.9 17.9 0 0 1 9.71 4.333 8.008 8.008 0 0 0 4.062 11zm5.969 0h3.938A15.905 15.905 0 0 0 12 4.248 15.905 15.905 0 0 0 10.03 11zm4.259-6.667A17.9 17.9 0 0 1 15.973 11h3.965a8.008 8.008 0 0 0-5.648-6.667z"/>
            </svg>`,
            command: (editor, args) => {
                // Remove any existing menu
                if (activeMenu && document.body.contains(activeMenu)) {
                    document.body.removeChild(activeMenu);
                }

                const languages = [
                    { code: 'de', label: 'German' },
                    { code: 'en', label: 'English' },
                    { code: 'fr', label: 'French' },
                    { code: 'es', label: 'Spanish' },
                    { code: 'it', label: 'Italian' }
                ];

                // Get current language from selection
                const currentLang = editor.getAttributes('language').lang;

                // Create dropdown menu
                const menu = document.createElement('div');
                activeMenu = menu;
                menu.className = 'select-menu';
                menu.style.position = 'fixed';
                menu.style.zIndex = 1000;
                menu.style.backgroundColor = 'white';
                menu.style.border = '1px solid #ddd';
                menu.style.borderRadius = '4px';
                menu.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                menu.style.padding = '4px 0';
                menu.style.minWidth = '150px';

                languages.forEach(lang => {
                    const button = document.createElement('button');
                    button.className = 'select-menu-item';
                    button.style.display = 'block';
                    button.style.width = '100%';
                    button.style.padding = '8px 16px';
                    button.style.border = 'none';
                    button.style.textAlign = 'left';
                    button.style.fontSize = '14px';
                    button.style.background = 'none';
                    button.style.cursor = 'pointer';
                    button.textContent = lang.label;

                    // Highlight active language
                    if (currentLang === lang.code) {
                        button.style.backgroundColor = '#f5f8fc';
                        button.style.fontWeight = 'bold';
                    }

                    button.addEventListener('click', () => {
                        editor.commands.setLanguage({ lang: lang.code });
                        if (document.body.contains(menu)) {
                            document.body.removeChild(menu);
                        }
                    });
                    button.addEventListener('mouseover', () => {
                        button.style.backgroundColor = currentLang === lang.code ? '#f5f8fc' : '#f3f4f6';
                    });
                    button.addEventListener('mouseout', () => {
                        button.style.backgroundColor = currentLang === lang.code ? '#f5f8fc' : 'transparent';
                    });
                    menu.appendChild(button);
                });

                // Add separator
                const separator = document.createElement('div');
                separator.style.margin = '4px 0';
                separator.style.borderTop = '1px solid #ddd';
                menu.appendChild(separator);

                // Add remove language option
                const removeButton = document.createElement('button');
                removeButton.className = 'select-menu-item';
                removeButton.style.display = 'block';
                removeButton.style.width = '100%';
                removeButton.style.padding = '8px 16px';
                removeButton.style.border = 'none';
                removeButton.style.textAlign = 'left';
                removeButton.style.fontSize = '14px';
                removeButton.style.background = 'none';
                removeButton.style.cursor = 'pointer';
                removeButton.style.color = '#dc2626';
                removeButton.textContent = 'Remove language';

                removeButton.addEventListener('click', () => {
                    editor.commands.removeLanguage();
                    if (document.body.contains(menu)) {
                        document.body.removeChild(menu);
                    }
                });
                removeButton.addEventListener('mouseover', () => {
                    removeButton.style.backgroundColor = '#fee2e2';
                });
                removeButton.addEventListener('mouseout', () => {
                    removeButton.style.backgroundColor = 'transparent';
                });
                menu.appendChild(removeButton);

                // Position the menu under the button using event target
                const buttonElement = event.target.closest('button');
                const rect = buttonElement.getBoundingClientRect();
                menu.style.top = `${rect.bottom + 5}px`;
                menu.style.left = `${rect.left}px`;

                // Add menu to body
                document.body.appendChild(menu);

                // Remove menu when clicking outside
                const removeMenu = (e) => {
                    if (!menu.contains(e.target)) {
                        if (document.body.contains(menu)) {
                            document.body.removeChild(menu);
                        }
                        document.removeEventListener('click', removeMenu);
                    }
                };
                setTimeout(() => {
                    document.addEventListener('click', removeMenu);
                });
            }
        });
    });
});
