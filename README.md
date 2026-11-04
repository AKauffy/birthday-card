# birthday-card

A personalized birthday card app built with Angular 22. It includes a seasonal memory timeline, a firefly game that unlocks a hidden letter, and a small animated pug runner for a playful touch.

## Local development

```bash
npm install
npm run start
```

Then open http://localhost:4200

## Production build

```bash
npm run build
```

The production bundle is emitted to `dist/birthday-card`.

## Homelab deployment

This project is designed to be served as a static Angular build on a homelab box or small web server.

Typical flow:

1. Build the app locally or in CI.
2. Copy the contents of `dist/birthday-card` to a web server directory.
3. Serve it behind nginx, Caddy, or another reverse proxy.

Example nginx location:

```nginx
location / {
  root /var/www/birthday-card;
  try_files $uri $uri/ /index.html;
}
```

You can also pair this with a reverse proxy such as:

```nginx
location /birthday-card {
  proxy_pass http://192.168.1.50:4200;
  proxy_set_header Host $host;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

## Customizing the card

Edit the values in `src/app/model/data.ts`:

- `HER_NAME`
- `YOUR_NAME`
- `MEMORIES`
- `LETTER`
- `GOAL`

Replace placeholder values with your real names, dates, and note text before deployment.
