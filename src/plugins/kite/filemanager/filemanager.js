import path from 'path';

export default class FileManager {
    constructor() { }

    configure(config) {
        this.api_url = config.api_url || '';
    }

    async getFiles(userid, filepath) {
        const reqpath = path.join(userid, filepath || '/');
        const files = await fetch(`${this.api_url}api/files/${reqpath}`);
        return files.json();
    }

    downloadFile(file, filename) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;base64,' + file.contents);
        element.setAttribute('download', filename);
    
        element.style.display = 'none';
        document.body.appendChild(element);
    
        element.click();
    
        document.body.removeChild(element);
    }
    //downloadFile(userid, filepath) {
//
    //}
}

FileManager.install = function(Vue, options) {
    Object.defineProperty(Vue.prototype, '$fileManager', {
        get() {return this.$root._fileManager}
    })

    Vue.mixin({
        beforeCreate() {
            if(this.$options.fileManager) {
                this._fileManager = this.$options.fileManager
                this._fileManager.configure(options)
            }
        }
    })
}