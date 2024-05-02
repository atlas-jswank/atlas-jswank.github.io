import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

const customTheme = {
	"colors": {
		"activityBar.activeBorder": "#f9826c",
		"activityBar.background": "#00003c",
		"activityBar.border": "#1b1f23",
		"activityBar.foreground": "#e1e4e8",
		"activityBar.inactiveForeground": "#6a737d",
		"activityBarBadge.background": "#0366d6",
		"activityBarBadge.foreground": "#fff",
		"badge.background": "#044289",
		"badge.foreground": "#c8e1ff",
		"breadcrumb.activeSelectionForeground": "#d1d5da",
		"breadcrumb.focusForeground": "#e1e4e8",
		"breadcrumb.foreground": "#959da5",
		"breadcrumbPicker.background": "#2b3036",
		"button.background": "#176f2c",
		"button.foreground": "#dcffe4",
		"button.hoverBackground": "#22863a",
		"button.secondaryBackground": "#444d56",
		"button.secondaryForeground": "#fff",
		"button.secondaryHoverBackground": "#586069",
		"checkbox.background": "#444d56",
		"checkbox.border": "#1b1f23",
		"debugToolBar.background": "#2b3036",
		"descriptionForeground": "#959da5",
		"diffEditor.insertedTextBackground": "#28a74530",
		"diffEditor.removedTextBackground": "#d73a4930",
		"dropdown.background": "#2f363d",
		"dropdown.border": "#1b1f23",
		"dropdown.foreground": "#e1e4e8",
		"dropdown.listBackground": "#00003c",
		"editor.background": "#00003c",
		"editor.findMatchBackground": "#ffd33d44",
		"editor.findMatchHighlightBackground": "#ffd33d22",
		"editor.focusedStackFrameHighlightBackground": "#2b6a3033",
		"editor.foldBackground": "#58606915",
		"editor.foreground": "#e1e4e8",
		"editor.inactiveSelectionBackground": "#3392FF22",
		"editor.lineHighlightBackground": "#2b3036",
		"editor.linkedEditingBackground": "#3392FF22",
		"editor.selectionBackground": "#3392FF44",
		"editor.selectionHighlightBackground": "#17E5E633",
		"editor.selectionHighlightBorder": "#17E5E600",
		"editor.stackFrameHighlightBackground": "#C6902625",
		"editor.wordHighlightBackground": "#17E5E600",
		"editor.wordHighlightBorder": "#17E5E699",
		"editor.wordHighlightStrongBackground": "#17E5E600",
		"editor.wordHighlightStrongBorder": "#17E5E666",
		"editorBracketHighlight.foreground1": "#1ed2af",
		"editorBracketHighlight.foreground2": "#ffab70",
		"editorBracketHighlight.foreground3": "#1ed2af",
		"editorBracketHighlight.foreground4": "#1ed2af",
		"editorBracketHighlight.foreground5": "#ffab70",
		"editorBracketHighlight.foreground6": "#1ed2af",
		"editorBracketMatch.background": "#17E5E650",
		"editorBracketMatch.border": "#17E5E600",
		"editorCursor.foreground": "#c8e1ff",
		"editorError.foreground": "#d00414",
		"editorGroup.border": "#1b1f23",
		"editorGroupHeader.tabsBackground": "#1f2428",
		"editorGroupHeader.tabsBorder": "#1b1f23",
		"editorGutter.addedBackground": "#28a745",
		"editorGutter.deletedBackground": "#ea4a5a",
		"editorGutter.modifiedBackground": "#2188ff",
		"editorIndentGuide.activeBackground": "#444d56",
		"editorIndentGuide.background": "#2f363d",
		"editorLineNumber.activeForeground": "#e1e4e8",
		"editorLineNumber.foreground": "#444d56",
		"editorOverviewRuler.border": "#1b1f23",
		"editorWarning.foreground": "#ffea7f",
		"editorWhitespace.foreground": "#444d56",
		"editorWidget.background": "#1f2428",
		"errorForeground": "#d00414",
		"focusBorder": "#005cc5",
		"foreground": "#d1d5da",
		"gitDecoration.addedResourceForeground": "#34d058",
		"gitDecoration.conflictingResourceForeground": "#ffab70",
		"gitDecoration.deletedResourceForeground": "#ea4a5a",
		"gitDecoration.ignoredResourceForeground": "#6a737d",
		"gitDecoration.modifiedResourceForeground": "#1ed2af",
		"gitDecoration.submoduleResourceForeground": "#6a737d",
		"gitDecoration.untrackedResourceForeground": "#34d058",
		"input.background": "#2f363d",
		"input.border": "#1b1f23",
		"input.foreground": "#e1e4e8",
		"input.placeholderForeground": "#959da5",
		"list.activeSelectionBackground": "#39414a",
		"list.activeSelectionForeground": "#e1e4e8",
		"list.focusBackground": "#044289",
		"list.hoverBackground": "#282e34",
		"list.hoverForeground": "#e1e4e8",
		"list.inactiveFocusBackground": "#1d2d3e",
		"list.inactiveSelectionBackground": "#282e34",
		"list.inactiveSelectionForeground": "#e1e4e8",
		"notificationCenterHeader.background": "#00003c",
		"notificationCenterHeader.foreground": "#959da5",
		"notifications.background": "#2f363d",
		"notifications.border": "#1b1f23",
		"notifications.foreground": "#e1e4e8",
		"notificationsErrorIcon.foreground": "#ea4a5a",
		"notificationsInfoIcon.foreground": "#1ed2af",
		"notificationsWarningIcon.foreground": "#ffab70",
		"panel.background": "#1f2428",
		"panel.border": "#1b1f23",
		"panelInput.border": "#2f363d",
		"panelTitle.activeBorder": "#f9826c",
		"panelTitle.activeForeground": "#e1e4e8",
		"panelTitle.inactiveForeground": "#959da5",
		"peekViewEditor.background": "#1f242888",
		"peekViewEditor.matchHighlightBackground": "#ffd33d33",
		"peekViewResult.background": "#1f2428",
		"peekViewResult.matchHighlightBackground": "#ffd33d33",
		"pickerGroup.border": "#444d56",
		"pickerGroup.foreground": "#e1e4e8",
		"progressBar.background": "#0366d6",
		"quickInput.background": "#00003c",
		"quickInput.foreground": "#e1e4e8",
		"scrollbar.shadow": "#0008",
		"scrollbarSlider.activeBackground": "#6a737d88",
		"scrollbarSlider.background": "#6a737d33",
		"scrollbarSlider.hoverBackground": "#6a737d44",
		"settings.headerForeground": "#e1e4e8",
		"settings.modifiedItemIndicator": "#0366d6",
		"sideBar.background": "#1f2428",
		"sideBar.border": "#1b1f23",
		"sideBar.foreground": "#d1d5da",
		"sideBarSectionHeader.background": "#1f2428",
		"sideBarSectionHeader.border": "#1b1f23",
		"sideBarSectionHeader.foreground": "#e1e4e8",
		"sideBarTitle.foreground": "#e1e4e8",
		"statusBar.background": "#00003c",
		"statusBar.border": "#1b1f23",
		"statusBar.debuggingBackground": "#931c06",
		"statusBar.debuggingForeground": "#fff",
		"statusBar.foreground": "#d1d5da",
		"statusBar.noFolderBackground": "#00003c",
		"statusBarItem.prominentBackground": "#282e34",
		"statusBarItem.remoteBackground": "#00003c",
		"statusBarItem.remoteForeground": "#d1d5da",
		"tab.activeBackground": "#00003c",
		"tab.activeBorder": "#00003c",
		"tab.activeBorderTop": "#f9826c",
		"tab.activeForeground": "#e1e4e8",
		"tab.border": "#1b1f23",
		"tab.hoverBackground": "#00003c",
		"tab.inactiveBackground": "#1f2428",
		"tab.inactiveForeground": "#959da5",
		"tab.unfocusedActiveBorder": "#00003c",
		"tab.unfocusedActiveBorderTop": "#1b1f23",
		"tab.unfocusedHoverBackground": "#00003c",
		"terminal.ansiBlack": "#586069",
		"terminal.ansiBlue": "#2188ff",
		"terminal.ansiBrightBlack": "#959da5",
		"terminal.ansiBrightBlue": "#1ed2af",
		"terminal.ansiBrightCyan": "#56d4dd",
		"terminal.ansiBrightGreen": "#1ed2af",
		"terminal.ansiBrightMagenta": "#1ed2af",
		"terminal.ansiBrightRed": "#d00414",
		"terminal.ansiBrightWhite": "#fafbfc",
		"terminal.ansiBrightYellow": "#ffea7f",
		"terminal.ansiCyan": "#39c5cf",
		"terminal.ansiGreen": "#34d058",
		"terminal.ansiMagenta": "#1ed2af",
		"terminal.ansiRed": "#ea4a5a",
		"terminal.ansiWhite": "#d1d5da",
		"terminal.ansiYellow": "#ffea7f",
		"terminal.foreground": "#d1d5da",
		"terminal.tab.activeBorder": "#f9826c",
		"terminalCursor.background": "#586069",
		"terminalCursor.foreground": "#1ed2af",
		"textBlockQuote.background": "#00003c",
		"textBlockQuote.border": "#444d56",
		"textCodeBlock.background": "#2f363d",
		"textLink.activeForeground": "#c8e1ff",
		"textLink.foreground": "#1ed2af",
		"textPreformat.foreground": "#d1d5da",
		"textSeparator.foreground": "#586069",
		"titleBar.activeBackground": "#00003c",
		"titleBar.activeForeground": "#e1e4e8",
		"titleBar.border": "#1b1f23",
		"titleBar.inactiveBackground": "#1f2428",
		"titleBar.inactiveForeground": "#959da5",
		"tree.indentGuidesStroke": "#2f363d",
		"welcomePage.buttonBackground": "#2f363d",
		"welcomePage.buttonHoverBackground": "#444d56"
	},
	"displayName": "GitHub Dark",
	"name": "github-dark",
	"semanticHighlighting": true,
	"tokenColors": [
		{
			"scope": [
				"comment",
				"punctuation.definition.comment",
				"string.comment"
			],
			"settings": {
				"foreground": "#6a737d"
			}
		},
		{
			"scope": [
				"constant",
				"entity.name.constant",
				"variable.other.constant",
				"variable.other.enummember",
				"variable.language"
			],
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": [
				"entity",
				"entity.name"
			],
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "variable.parameter.function",
			"settings": {
				"foreground": "#e1e4e8"
			}
		},
		{
			"scope": "entity.name.tag",
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "keyword",
			"settings": {
				"foreground": "#d00414"
			}
		},
		{
			"scope": [
				"storage",
				"storage.type"
			],
			"settings": {
				"foreground": "#d00414"
			}
		},
		{
			"scope": [
				"storage.modifier.package",
				"storage.modifier.import",
				"storage.type.java"
			],
			"settings": {
				"foreground": "#e1e4e8"
			}
		},
		{
			"scope": [
				"string",
				"punctuation.definition.string",
				"string punctuation.section.embedded source"
			],
			"settings": {
				"foreground": "#f7f0dc"
			}
		},
		{
			"scope": "support",
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "meta.property-name",
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "variable",
			"settings": {
				"foreground": "#ffab70"
			}
		},
		{
			"scope": "variable.other",
			"settings": {
				"foreground": "#e1e4e8"
			}
		},
		{
			"scope": "invalid.broken",
			"settings": {
				"fontStyle": "italic",
				"foreground": "#fdaeb7"
			}
		},
		{
			"scope": "invalid.deprecated",
			"settings": {
				"fontStyle": "italic",
				"foreground": "#fdaeb7"
			}
		},
		{
			"scope": "invalid.illegal",
			"settings": {
				"fontStyle": "italic",
				"foreground": "#fdaeb7"
			}
		},
		{
			"scope": "invalid.unimplemented",
			"settings": {
				"fontStyle": "italic",
				"foreground": "#fdaeb7"
			}
		},
		{
			"scope": "carriage-return",
			"settings": {
				"background": "#d00414",
				"content": "^M",
				"fontStyle": "italic underline",
				"foreground": "#00003c"
			}
		},
		{
			"scope": "message.error",
			"settings": {
				"foreground": "#fdaeb7"
			}
		},
		{
			"scope": "string variable",
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": [
				"source.regexp",
				"string.regexp"
			],
			"settings": {
				"foreground": "#dbedff"
			}
		},
		{
			"scope": [
				"string.regexp.character-class",
				"string.regexp constant.character.escape",
				"string.regexp source.ruby.embedded",
				"string.regexp string.regexp.arbitrary-repitition"
			],
			"settings": {
				"foreground": "#dbedff"
			}
		},
		{
			"scope": "string.regexp constant.character.escape",
			"settings": {
				"fontStyle": "bold",
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "support.constant",
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "support.variable",
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "meta.module-reference",
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "punctuation.definition.list.begin.markdown",
			"settings": {
				"foreground": "#ffab70"
			}
		},
		{
			"scope": [
				"markup.heading",
				"markup.heading entity.name"
			],
			"settings": {
				"fontStyle": "bold",
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "markup.quote",
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "markup.italic",
			"settings": {
				"fontStyle": "italic",
				"foreground": "#e1e4e8"
			}
		},
		{
			"scope": "markup.bold",
			"settings": {
				"fontStyle": "bold",
				"foreground": "#e1e4e8"
			}
		},
		{
			"scope": [
				"markup.underline"
			],
			"settings": {
				"fontStyle": "underline"
			}
		},
		{
			"scope": [
				"markup.strikethrough"
			],
			"settings": {
				"fontStyle": "strikethrough"
			}
		},
		{
			"scope": "markup.inline.raw",
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": [
				"markup.deleted",
				"meta.diff.header.from-file",
				"punctuation.definition.deleted"
			],
			"settings": {
				"background": "#86181d",
				"foreground": "#fdaeb7"
			}
		},
		{
			"scope": [
				"markup.inserted",
				"meta.diff.header.to-file",
				"punctuation.definition.inserted"
			],
			"settings": {
				"background": "#144620",
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": [
				"markup.changed",
				"punctuation.definition.changed"
			],
			"settings": {
				"background": "#c24e00",
				"foreground": "#ffab70"
			}
		},
		{
			"scope": [
				"markup.ignored",
				"markup.untracked"
			],
			"settings": {
				"background": "#1ed2af",
				"foreground": "#2f363d"
			}
		},
		{
			"scope": "meta.diff.range",
			"settings": {
				"fontStyle": "bold",
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "meta.diff.header",
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "meta.separator",
			"settings": {
				"fontStyle": "bold",
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": "meta.output",
			"settings": {
				"foreground": "#1ed2af"
			}
		},
		{
			"scope": [
				"brackethighlighter.tag",
				"brackethighlighter.curly",
				"brackethighlighter.round",
				"brackethighlighter.square",
				"brackethighlighter.angle",
				"brackethighlighter.quote"
			],
			"settings": {
				"foreground": "#d1d5da"
			}
		},
		{
			"scope": "brackethighlighter.unmatched",
			"settings": {
				"foreground": "#fdaeb7"
			}
		},
		{
			"scope": [
				"constant.other.reference.link",
				"string.other.link"
			],
			"settings": {
				"fontStyle": "underline",
				"foreground": "#dbedff"
			}
		}
	],
	"type": "dark"
}

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: { theme: customTheme },
	},
});
