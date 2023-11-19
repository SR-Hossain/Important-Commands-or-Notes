```bash
sudo gpasswd -a $USER input
```
Log out and log in again or reboot.



```bash
sudo apt install wmctrl python3 python3-setuptools xdotool python3-gi libinput-tools meson gettext -y


# Install Required Packages
git clone [https://github.com/bulletmark/libinput-gestures.git](https://github.com/bulletmark/libinput-gestures.git)
cd libinput-gestures/
sudo make install
libinput-gestures-setup autostart
libinput-gestures-setup start

# Configure Gestures App
git clone [https://gitlab.com/nokun/gestures.git](https://gitlab.com/nokun/gestures.git)
cd gestures
meson build --prefix=/usr
ninja -C build
sudo ninja -C build install
```

Open the gestures app and configure it using the keycodes listed here: [Link to xdotool keycode list](https://gitlab.com/nokun/gestures/-/wikis/xdotool-list-of-key-codes)
