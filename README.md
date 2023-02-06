# <p align="center">📱 PocketRSS</p>

<p align="center">PocketRSS - A powerfull RSS aggregate server in 1 file compatible with Mastodon client and RSS client.</p>

## Features

PocketRSS is a powerfull RSS aggregate server in 1 file with **XML** and
**json** APIs. It compatible RSS clients and mastodon clients.

- ⚡️ 1 file and lower resource needed

- 🌀 1 click running

- ⚛️ Easy to use

- 💨 Elegant dashboard

- 🐘 Compatible with mastodon clients

- 💎 Compatible with RSS clients

- 🔨 Saving data, favorites etc in your own server

## Getting Started

### Docker

Create config file as below

```toml
[listen]
ip = "0.0.0.0"
port = 5000
pprof = false

[instance]
uri = "pocketrss.com"
websocket_endpoint = "wss://pocketrss.com"
enable_sensitive = false

[db]
name = "./pocketrss.db"

[sync]
enabled = true
interval = 10 # number as minute; 数字，单位分钟

[logger]
level = "error"
```

```
docker run -itd --name pocketrss -p 5000:5000 -v /some/where/pocketrss.toml:/app/pocketrss.toml -v /some/where/pocketrss.db:/app/pocketrss.db leopku/pocketrss
```

> menthion: remember to change `/some/where` to your actual path where you want
> to save config and database files.

### Binary install

1. Download
   [newest release](https://github.com/pocketrss/pocketrss-dasnboard/releases)
   from github

2. Uncompress downloaded file and open uncompressed directory

3. Copy `pocketrss.example.toml` as `pocketrss.toml`

4. Run pocketrss server in terminal

   ```bash
   ./pocketrss_linux_amd64 serve
   ```

5. Look at [http://localhost:5000](http://localhost:5000) to see the dashboard.

## Screenshot

### Dashboard

- Home

![](/assets/images/dashboard_home.png?raw=true)

- Feeds

![](/assets/images/dashboard_feeds.png?raw=true)

- Entries

![](/assets/images/dashboard_entries.png?raw=true)

- Favorites

![](/assets/images/dashboard_favorites.png?raw=true)

### Clients

#### Android

- Tusky

![](/assets/images/client_tusky.jpg?raw=true)

#### Desktop

- Leaf

![](/assets/images/client_leaf.png?raw=true)

### Web

- [Pinafore](https://pinafore.social)

![](/assets/images/client_pinafore.png?raw=true)

## FAQ

- Where is the RSS endpoint

  `http[s]://your.server/rss`

- How can I visit my own server without SSL using Tusky.

  Using my modified version of Tusky. I can be found in
  [release page](https://github.com/pocketrss/pocketrss-dashboard/releases/tag/Tusky-debug-20220713)
