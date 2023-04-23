# ScryfallPrinter

I wanted to be able to easily create markdown checklists of entire Magic: The Gathering sets using the Scryfall API, so I threw this ultra-simple script together.

## Usage

`$ node index.js SET`

After installing the dependencies with your package manager of choice, simply run the command `node index.js SET`, replacing `SET` with the set's abbreviation (e.g. 'LRW' for Lorwyn). It should work with the set name for sets with single-word names (e.g., again, Lorwyn) or single words that Scryfall links directly to a particular set (e.g. 'Betrayers' for Betrayers of Kamigawa), but I really only wrote this with the abbreviations in mind, so searches for multiple words aren't currently supported. It also only looks up unique cards in each set - although I'm likely to change this soon because it annoys the completionist in me.

The results of the search are written to a markdown file in the `./output` directory using your query as the file name and heading. Each individual card is listed as `- [ ] # Card Name`. So, for example, a search for Lorwyn would output:

```md
# LORWYN

- [ ] 1 Ajani Goldmane
- [ ] 2 Arbiter of Knollridge
...
- [ ] 298 Forest
```

## Contributing

I may or may not make additions or improvements depending on my future needs and/or laziness. However, I'm happy to accept PRs with changes.
