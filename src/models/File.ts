class File {
  private _path: string = "";
  private _newPath: string = "";

  private constructor(path: string, newPath: string) {
    this._path = path;
    this._newPath = newPath;
  }

  get path(): string {
    return this._path;
  }

  get newPath(): string {
    return this._newPath;
  }

  public static get instance(): File {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    const newName = `${day}_${month}_${year}_${hour}_${minute}_${seconds}`;

    return new File("/home/uploads/result.csv", `/home/uploads/${newName}.csv`);
  }
}

export { File };