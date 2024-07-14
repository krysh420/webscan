FROM kalilinux/kali-rolling
RUN apt update --yes
RUN apt install nikto --yes

