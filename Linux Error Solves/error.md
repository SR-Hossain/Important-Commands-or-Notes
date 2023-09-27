```bash
sudo nano /etc/pacman.conf
```

find and change the siglevel line to <code>SigLevel = Required DatabaseNever</code>


You can safely remove the files in /var/lib/pacman/sync as they will be fetched as necessary.
```bash
sudo rm -f /var/lib/pacman/sync/*
```

Change mirror

```bash
sudo pacman-mirrors --continent
```

Update
```bash
sudo pacman -Syyu
```
