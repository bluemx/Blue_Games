using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;
using System.Runtime.InteropServices;


public class Manager : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void EnviarMsj(string str);

    [DllImport("__Internal")]
    private static extern void DatosFinales(int score, int tool1, int tool2, int tool3, int tool4, int tool5, int tool6, int tool7, int errors);



    [SerializeField] private int puntaje=0;
    [SerializeField] TextMeshProUGUI texto;
    [SerializeField] Animator fondo;
    
    [SerializeField] GameObject pantallaPausa;
    [SerializeField] GameObject gameOver;
    [SerializeField] GameObject cubeta;
    [SerializeField] Sprite cubetaLuz, cubetaNormal;

    [SerializeField] AudioClip sonido,final;
    [SerializeField] AudioSource mainMusica;

    AudioClip tempA;

    public AudioSource musica;
    public float contador;
    public int [] herramientas = new int [4];
    public int error;
    
    //public TextMeshProUGUI minText, segText;

    int min, sec;

    
    public TextMeshProUGUI gameOverText;
    public bool fin=false;

    public Spawner spawn;

    public Image[] lineas;

    int temp;
    float tiempoEspera=2f;

    bool luz = false;

    float contadorCubeta = 3f;
    float tempContador;

    public int puntos { get { return puntaje; } }

    // Start is called before the first frame update
    void Start()
    {
        EnviarMsj("gamestart");
        tempContador = contadorCubeta;
        gameOver.SetActive(false);
        MostrarPuntos();
    }


    void TotalHerramientas()
    {
        EnviarMsj("'gameover'");
        DatosFinales(puntaje, herramientas[0], herramientas[1], herramientas[2], herramientas[3], herramientas[4], herramientas[5], herramientas[6], error);
    }

    public void ActualizarPuntos(bool a,int b,AudioClip c)
    {
        if (a)
        {
            puntaje -= b;
            musica.clip = c;
            musica.Play();
            MostrarPuntos();
        }
        else
        {

            puntaje += b;
            musica.clip = c;
            musica.Play();
            MostrarPuntos();

            //temp = b;
            //tempA = c;

            //StartCoroutine("SumarPuntos");

        }


        
    }

    // Update is called once per frame
    public void MostrarPuntos()
    {
        texto.text = puntaje.ToString();
        
    }

    public void Particulas()
    {
        cubeta.transform.GetChild(0).gameObject.SetActive(true);
        
    }


    public void Cubeta(bool piedra)
    {
        if(piedra)
        {
            //animeacion cubeta
            Piedra();

        }
        else
        {
            cubeta.GetComponent<Image>().sprite = cubetaLuz;

            contadorCubeta = tempContador;
            luz = true;
        }
       
    }

   public void Cubeta()
   {
        cubeta.GetComponent<Image>().sprite = cubetaNormal;
   }


    IEnumerator SumarPuntos()
    {
        while(true)
        {
            if(temp>0)
            {
                musica.clip = tempA;
                musica.Play();
                puntaje++;
                
                MostrarPuntos();
                temp--;
            }

            yield return new WaitForSeconds(0.01f);
        }
    }
    private void Update()
    {

        //if(positivo)
        //{
        //    for (; temp > 0; temp--)
        //    {
        //        Debug.Log(temp);

                

        //    }

        //}

        if(luz)
        {
            if (contadorCubeta > 0)
                contadorCubeta -= Time.deltaTime;

            if(contadorCubeta<=0)
            {
                Cubeta();
                contadorCubeta = tempContador;
                luz = false;
            }
        }

        if(contador>0)
        {
            contador -= Time.deltaTime;
            spawn.time -= (Time.deltaTime / 5);
            //spawn.speed += (Time.deltaTime * 2);

            if (spawn.time <= 0.5f)
                spawn.time = 0.5f;
        }
       
       
        

        if (contador <= 0)
        {
            contador = 0;
            
        }

        min = (int)(contador / 60f);
        sec = (int)(contador - min * 60f);

        //minText.text = string.Format("{0:00}:{1:00}", min, sec);

        ContadorLineas(sec);
        

        if (contador == 0&& !fin)
        {

            tiempoEspera -= Time.deltaTime;
            //spawn.Explotan();
            musica.clip = final;
            musica.Play();
            cubeta.GetComponent<Rigidbody2D>().bodyType = RigidbodyType2D.Static;
            cubeta.GetComponent<BoxCollider2D>().enabled = false;

            if (tiempoEspera<=0)
            {

             
                gameOver.SetActive(true);

                gameOverText.text = puntaje.ToString();

                TotalHerramientas();

                Debug.Log("Error: " + error);

                fin = true;
            }

           

        }
    }

  
    private void Piedra()
    {
        fondo.Play("Fondo");
        cubeta.GetComponent<Animator>().Play("CubetaError");
    }

   
    void ContadorLineas(int a)
    {
        switch (a)
        {
            case 54:
                lineas[0].gameObject.SetActive(false);
                break;
            case 48:
                lineas[1].gameObject.SetActive(false);
                break;
            case 42:
                lineas[2].gameObject.SetActive(false);
                break;
            case 36:
                lineas[3].gameObject.SetActive(false);
                break;
            case 30:
                lineas[4].gameObject.SetActive(false);
                break;
            case 24:
                lineas[5].gameObject.SetActive(false);
                break;
            case 18:
                lineas[6].gameObject.SetActive(false);
                break;
            case 12:
                lineas[7].gameObject.SetActive(false);
                break;
            case 6:
                lineas[8].gameObject.SetActive(false);
                break;
            case 0:
                lineas[9].gameObject.SetActive(false);
                break;
        }
    }


    public void Pausa(string name)
    {

        if(name=="pausa")
        {
            mainMusica.clip = sonido;
            mainMusica.Play();
            pantallaPausa.SetActive(true);
            Time.timeScale = 0;
            musica.Pause();
        }
        else if(name=="play")
        {
            mainMusica.clip = sonido;
            mainMusica.Play();
            pantallaPausa.SetActive(false);
            Time.timeScale = 1;
            musica.Play();
        }
        


    }
}
