# Sử dụng hình ảnh cơ sở Windows Server Core
FROM mcr.microsoft.com/windows/servercore:ltsc2019 AS build

WORKDIR C:/app

# Sao chép source code
COPY . .

# Cài đặt Node.js và npm
RUN powershell.exe -Command "Invoke-WebRequest -Uri https://nodejs.org/dist/latest-v18.x/node-v18.19.0-x64.msi -OutFile nodejs.msi" && \
    powershell.exe -Command "Start-Process msiexec.exe -Wait -ArgumentList '/i nodejs.msi /quiet'" && \
    powershell.exe -Command "Remove-Item nodejs.msi"

# Cài đặt yarn
RUN npm install -g yarn

# Cài đặt Angular CLI và các dependencies
RUN npm install -g @angular/cli@16

#execution policy
RUN powershell.exe -Command "Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned"

# Cài đặt các packages cần thiết
RUN yarn -i

# Xây dựng ứng dụng Angular
RUN ng build --configuration production

# Đặt hình ảnh cơ sở cho nginx
FROM mcr.microsoft.com/windows/nanoserver:ltsc2019 AS final

# Sao chép tệp từ hình ảnh build trước đó
COPY --from=build C:/app/dist/vsirius-back-office C:/dist/vsirius-back-office

# Cấu hình nginx
RUN powershell -Command Add-WindowsFeature Web-Server; \
    Remove-Item -Recurse C:\inetpub\wwwroot\*; \
    Copy-Item -Recurse C:\dist\vsirius-back-office\* C:\inetpub\wwwroot\*

# Mở cổng 80
EXPOSE 80

# Đặt lệnh chạy khi container được khởi động
CMD ["C:\\windows\\system32\\inetsrv\\w3svc.exe"]