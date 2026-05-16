# Douyin-Style AI Feed Cards PRD

## Goal

Build a pure mock Next.js demo data layer for Douyin-style AI feed cards. The feed mixes short video items with AI utility cards that feel personalized, actionable, and instantly refreshable through action chips.

## Feed Order

The mock feed must render in this exact order:

1. Video
2. Food decision AI card
3. Video
4. Micro trip AI card
5. Video
6. Sports pre-match AI card
7. Recovery AI card

## AI Cards

Food decision card:
- Helps the user decide what to eat now.
- Includes action chips: Spicy, No delivery, Eating alone, Low calorie, Budget 30.
- Each chip updates the headline, personal reason, selected intent, and food recommendation content.

Micro trip card:
- Suggests a short nearby plan.
- Includes action chips: Less walking, Photo-friendly, Solo, Date, Low budget.
- Each chip updates the headline, personal reason, selected intent, and trip plan content.

Sports pre-match card:
- Gives a light pre-match read.
- Includes action chips: Home win, Draw, Away win, Player focus, One-line.
- Each chip updates the headline, personal reason, selected intent, and match content.

Recovery card:
- Offers a gentle reset after fatigue or stress.
- Includes action chips: Anxious, Lying down, Five minutes, No advice, Sleep.
- Each chip updates the headline, personal reason, selected intent, and recovery content.

## API

`POST /api/generate-card` returns a mock response:

```json
{ "card": "...", "source": "mock" }
```

If `currentCard` and `action` are provided, the API returns the deterministic transformed card. Otherwise, it returns the first mock AI card matching the requested `cardType`, or the first AI card if no type is provided.

## Constraints

- Use strict TypeScript types and avoid `any`.
- Keep transforms deterministic and side-effect free.
- Keep the demo fully mocked with no external AI calls.
- Do not edit UI files outside the data/API ownership boundary.
