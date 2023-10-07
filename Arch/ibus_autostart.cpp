#include <iostream>
#include <fstream>
#include <cstdlib>
using namespace std;
int main() {
    // Define the file content
    string desktopFileContent = "[Desktop Entry]\n"
                                     "Encoding=UTF-8\n"
                                     "Version=0.9.4\n"
                                     "Name=ibus\n"
                                     "Comment=\n"
                                     "Exec=autostart_script.sh\n"
                                     "Terminal=false\n"
                                     "StartupNotify=false\n"
                                     "Hidden=false\n"
                                     "Type=Application\n"
                                     "X-GNOME-Autostart-enabled=true\n";

    // Specify the file path where you want to create the .desktop file
    string desktopFilePath = "autostart_script.desktop";

    // Create and open the .desktop file for writing
    ofstream desktopFile(desktopFilePath);

    if (!desktopFile) {
        cerr << "Error: Unable to open desktop file for writing." << endl;
        return 1;
    } else {
        cout << "Desktop file created." << endl;
    }

    // Specify the file path where you want to create the .desktop file
    string shFilePath = "autostart_script.sh";

    // Create and open the .desktop file for writing
    ofstream shFile(shFilePath);

    if (!shFile) {
        cerr << "Error: Unable to open sh file for writing." << endl;
        return 1;
    } else {
        cout << "sh file created..." << endl;
    }

    // Write the content to the file
    desktopFile << desktopFileContent;
    desktopFile.close();

    // Execute the command to update Manjaro using sudo
    int exitCode = system("sudo chmod +x autostart_script.sh");

    if (exitCode == 0) {

        cout << "1. Edit autostart script?\n2. Exit\n\nWhich one do you want to do?: ";
        char choice = getchar();
        while (choice != '1' && choice != '2') {
            choice = getchar();
        }
        if (choice == '1') {
            system("nano ~/.config/autostart/autostart_script.sh");
        }

    } else {

        cerr << "Error: Command execution failed with exit code " << exitCode << endl;
    }

    return 0;
}
