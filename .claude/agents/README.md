# Claude Agents for Habit Forge

This directory contains agent configurations for specialized AI assistance on the Habit Forge project.

## Available Agents

### 1. Technical Writer (`technical-writer.md`)
Maintains project documentation, updates changelog, and ensures docs stay in sync with code.

**Invoke with:**
```
Act as the Technical Writer agent. Update documentation for [recent changes].
```

### 2. UX/UI Designer (`ux-designer.md`)
Reviews user interface, checks accessibility, and provides design improvement recommendations.

**Invoke with:**
```
Act as the UX/UI Designer agent. Review the [screen/component] for usability issues.
```

## Usage

These agent configurations provide:
- **Role definition**: What the agent is responsible for
- **Standards**: Quality guidelines to follow
- **Checklists**: Items to verify before completing tasks
- **Templates**: Output formats for reports

## Adding New Agents

To add a new agent:

1. Create `agent-name.md` in this directory
2. Include:
   - Role description
   - Responsibilities list
   - Required tools/setup
   - Quality checklist
   - Invocation example

## MCP Requirements

Some agents require MCP (Model Context Protocol) servers:

| Agent | MCP Requirement |
|-------|-----------------|
| Technical Writer | None |
| UX/UI Designer | Browser MCP (Puppeteer/Playwright) |

See individual agent files for setup instructions.
