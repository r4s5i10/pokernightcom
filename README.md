# PokerNight.com Rebuild

GitHub source for the in-progress PokerNight.com rebuild.

## Lifecycle status

This repository is intended to become the source for a future Vercel-hosted
PokerNight.com site. It is not yet the authoritative live PokerNight site, and
the current live hosting remains outside this repository's development
authority.

## Development workflow

- Use this clean clone for new rebuild development.
- Create focused development branches and validate changes locally.
- Keep transferred PokerNight working trees unchanged until their local
  modifications and migration-review assets have been dispositioned.
- Do not merge, push, or create a deployment without Melissa's explicit
  approval.

## Deployment and future cutover

- Preview or staging validation must remain separate from the production
  domain.
- Do not deploy this rebuild to the live PokerNight.com domain during routine
  development.
- A future Vercel production launch requires its own reviewed cutover plan,
  acceptance checks, rollback plan, and Melissa's explicit approval.
- Codex must not access or change the current host, domain registrar, DNS,
  nameservers, transfer settings, domain lock, or production-domain connection.

An approved source push, a successful Vercel build, and a domain cutover are
three separate events. Approval for one does not authorize the others.
