---
name: game-accessibility
description: "Make games accessible: visual (text size, contrast, colorblind support), audio (subtitles, visual cues), motor (full remapping, hold-to-toggle, timing options), cognitive (clear objectives, difficulty options) and input support, plus an accessibility audit checklist and findings format. Use when designing or auditing options menus, subtitles, remapping, colorblind modes or difficulty settings, or preparing for platform accessibility requirements."
---

# Game Accessibility

Let more players finish the game by building accessibility options in from the start and auditing them against a checklist.

## When to use

- Designing settings, subtitles, remapping or colorblind support.
- Auditing a screen or feature for accessibility gaps.
- Preparing an accessibility section for a release checklist.

**When not to use:** Layout and focus implementation details (use `game-ui-ux` and the engine UI skill).

## Workflow

1. Inspect the project first: engine version, existing classes, and how the feature is wired today.
2. Read the standards below that apply to the task, and the design document if one exists (`design/gdd/` in a studio project).
3. Propose the structure (classes, data flow, files) and the trade-offs before writing code.
4. Implement in small steps and verify each one in the engine or with tests.
5. Flag anything below that the current code violates, ranked by risk.


## What this covers
- Audit all UI and gameplay for accessibility compliance
- Define and enforce accessibility standards based on WCAG 2.1 and game-specific guidelines
- Review input systems for full remapping and alternative input support
- Ensure text readability at all supported resolutions and for all vision levels
- Validate color usage for colorblind safety
- Recommend assistive features appropriate to the game's genre

## Accessibility Standards

### Visual Accessibility
- Minimum text size: 18px at 1080p, scalable up to 200%
- Contrast ratio: minimum 4.5:1 for text, 3:1 for UI elements
- Colorblind modes: Protanopia, Deuteranopia, Tritanopia filters or alternative palettes
- Never convey information through color alone — always pair with shape, icon, or text
- Provide high-contrast UI option
- Subtitles and closed captions with speaker identification and background description
- Subtitle sizing: at least 3 size options

### Audio Accessibility
- Full subtitle support for all dialogue and story-critical audio
- Visual indicators for important directional or ambient sounds
- Separate volume sliders: Master, Music, SFX, Dialogue, UI
- Option to disable sudden loud sounds or normalize audio
- Mono audio option for single-speaker/hearing aid users

### Motor Accessibility
- Full input remapping for keyboard, mouse, and gamepad
- No inputs that require simultaneous multi-button presses (offer toggle alternatives)
- No QTEs without skip/auto-complete option
- Adjustable input timing (hold duration, repeat delay)
- One-handed play mode where feasible
- Auto-aim / aim assist options
- Adjustable game speed for action-heavy content

### Cognitive Accessibility
- Consistent UI layout and navigation patterns
- Clear, concise tutorial with option to replay
- Objective/quest reminders always accessible
- Option to simplify or reduce on-screen information
- Pause available at all times (single-player)
- Difficulty options that affect cognitive load (fewer enemies, longer timers)

### Input Support
- Keyboard + mouse fully supported
- Gamepad fully supported (Xbox, PlayStation, Switch layouts)
- Touch input if targeting mobile
- Support for adaptive controllers (Xbox Adaptive Controller)
- All interactive elements reachable by keyboard navigation alone

## Accessibility Audit Checklist
For every screen or feature:
- [ ] Text meets minimum size and contrast requirements
- [ ] Color is not the sole information carrier
- [ ] All interactive elements are keyboard/gamepad navigable
- [ ] Subtitles available for all audio content
- [ ] Input can be remapped
- [ ] No required simultaneous button presses
- [ ] Screen reader annotations present (if applicable)
- [ ] Motion-sensitive content can be reduced or disabled

## Related skills

- `game-ui-ux`
- `input-systems`
- `ux-review`
- `launch-checklist`

---
_Built for the merged game dev skill pack from the `accessibility-specialist` agent of Claude Code Game Studios (MIT, Copyright (c) 2026 Donchitos). See ATTRIBUTION.md._
