export class Serie {
    private _nome: string;
    private _autor: string;
    private _episodio: number;
    private _genero: string;
    private _sinopse: string;
    private _temporada: number;
    private _plataforma: string;
    private _id: any;
    private _downloadURL : any;
  
    constructor(
      nome: string,
      autor: string,
      episodio: number,
      genero: string,
      sinopse: string,
      temporada: number,
      plataforma: string
    ) {
      let chave = new Date();
      this._id = chave.getTime();
      this._nome = nome;
      this._autor = autor;
      this._episodio= episodio;
      this._genero = genero;
      this._sinopse = sinopse;
      this._temporada = temporada;
      this._plataforma = plataforma;
    }
    public get id(): any {
      return this._id;
    }
    public get nome(): string {
      return this._nome;
    }
  
    public set nome(nome: string){
      this._nome=nome;
  }
  
    public get autor(): string {
      return this._autor;
    }
  
    public set autor(autor: string) {
      this._autor = autor;
    }
  
    public get episodio(): number {
      return this._episodio;
    }
  
    public set episodio(episodio: number) {
      this._episodio = episodio;
    }
  
    public get genero(): string {
      return this._genero;
    }
  
    public set genero(genero: string) {
      this._genero = genero;
    }
  
    public get sinopse(): string {
      return this._sinopse;
    }
  
    public set sinopse(sinopse: string) {
      this._sinopse = sinopse;
    }
  
    public get temporada(): number {
      return this._temporada;
    }
  
    public set temporada(temporada: number) {
      this._temporada = temporada;
    }
  
    public get plataforma(): string {
      return this._plataforma;
    }
  
    public set plataforma(plataforma: string) {
      this._plataforma = plataforma;
    }
    public set downloadURL(downloadURL : any){
      this._downloadURL = downloadURL;
   }
  
    public get downloadURL(){
      return this._downloadURL;
    }
  
    
  }