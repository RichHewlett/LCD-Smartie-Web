from app import app

if __name__ == '__main__':
    ## specify hostname/ip here so that it can be seen on the network and not just local m/c  
    app.run(host="192.168.0.22", port=5000)
