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
    private static extern void DatosFinales(int score);

    public bool puedoTirar = false;

    [SerializeField] private int puntaje=0;
    [SerializeField] TextMeshProUGUI texto;
    [SerializeField] Animator fondo;
    
    [SerializeField] public GameObject pantallaPausa;
    [SerializeField] GameObject gameOver;
    

    [SerializeField] AudioClip sonido,final;
    [SerializeField] AudioSource mainMusica;

    AudioClip tempA;

    public AudioSource musica;
    public float contador;
    public int [] herramientas = new int [4];
    public int error;
    
    //public TextMeshProUGUI minText, segText;

    int min, sec;

    public bool botonPausa = false;
    
    public TextMeshProUGUI gameOverText;
    public bool fin=false;

    

    public Image[] lineas;

    int temp;
    float tiempoEspera=2f;

    

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
        EnviarMsj("gameover");
        DatosFinales(puntaje);
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

   
    IEnumerator Finale()
    {
        musica.clip = final;
        musica.Play();
        gameOver.SetActive(true);

        gameOverText.text = puntaje.ToString();

        TotalHerramientas();

        Debug.Log("Error: " + error);

        fin = true;

        yield return new WaitForSeconds(1f);

       

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

        

        if(contador>0)
        {
            contador -= Time.deltaTime;
            
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
            
           

            if (tiempoEspera<=0)
            {


                
                StartCoroutine("Finale");
            }

           

        }
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
        botonPausa = true;
        if (name=="pausa")
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
            botonPausa = false;
        }
        


    }
}
