#include <iostream>
#include <fstream>
#include <cstdlib>
using namespace std;
int main(){
    cout<<"Installing IBUS..."<<endl;
    system("sudo pacman -S ibus-typing-booster");
    if(!system("echo \"ibus-daemon -xdr\" >> ~/.config/autostart/autostart_script.sh")){
        cout<<"Added to autostart..."<<endl<<"Installation complete..."<<endl;
    }else{
        cerr<<"Failed to add to autostart..."<<endl;
    }
}
