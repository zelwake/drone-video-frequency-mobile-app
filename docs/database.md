# Database Guidelines

## Schema Management

- Schema defined in `db/schema.ts` using Drizzle ORM
- Migrations stored in `drizzle/` directory
- Database name: `frequencies.db` (from `constants/database.ts`)

## Migration Workflow

1. Make changes to `db/schema.ts`
2. Generate migration: `npx drizzle-kit generate`
3. **Always generate migrations after schema changes**

## Query Patterns

- Use Drizzle's type-safe query builder
- Avoid raw SQL queries when possible

## Development Tools

- **Drizzle Studio:** `npx drizzle-kit studio` - Visual database browser

## Official Bands

On first launch, 10 official bands are seeded:

| Sign | Name         | Frequencies (MHz)                              |
| ---- | ------------ | ---------------------------------------------- |
| A    | Boscam A     | 5865, 5845, 5825, 5805, 5785, 5765, 5745, 5725 |
| B    | Boscam B     | 5733, 5752, 5771, 5790, 5809, 5828, 5847, 5866 |
| E    | Boscam E     | 5705, 5685, 5665, 5645, 5885, 5905, 5925, 5945 |
| F    | FatShark     | 5740, 5760, 5780, 5800, 5820, 5840, 5860, 5880 |
| R    | Race Band    | 5658, 5695, 5732, 5769, 5806, 5843, 5880, 5917 |
| D    | Boscam D/DJI | 5362, 5399, 5436, 5473, 5510, 5547, 5584, 5621 |
| U    | U Band       | 5325, 5348, 5366, 5384, 5402, 5420, 5438, 5456 |
| O    | O Band       | 5474, 5492, 5510, 5528, 5546, 5564, 5582, 5600 |
| L    | Low Band     | 5333, 5373, 5413, 5453, 5493, 5533, 5573, 5613 |
| H    | High Band    | 5653, 5693, 5733, 5773, 5813, 5853, 5893, 5933 |
