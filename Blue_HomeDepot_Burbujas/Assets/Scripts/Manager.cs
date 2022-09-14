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
    private static extern void DatosFinales(int score, int tool1, int tool2, int tool3, int tool4, int errors);

   

    [SerializeField] private int puntaje;
    [SerializeField] TextMeshProUGUI texto;
    public float contador;

    public int [] herramientas = new int [4];
    public int error;


    //public TextMeshProUGUI minText, segText;

    int min, sec;

    public GameObject gameOver;
    public TextMeshProUGUI gameOverText;
    public bool fin=false;

    public Spawn spawn;

    public Image[] lineas;

    public Sprite lineaVacia;

    float tiempoEspera=3f;

    public int puntos { get { return puntaje; } }

    // Start is called before the first frame update
    void Start()
    {
        EnviarMsj("gamestart");

        gameOver.SetActive(false);
        MostrarPuntos();
    }


    void TotalHerramientas()
    {
        //EnviarMsj("'gameover'");
        DatosFinales(puntaje, herramientas[0], herramientas[1], herramientas[2], herramientas[3], error);
    }

    public void ActualizarPuntos(bool a,int b)
    {
        if (a)
            puntaje -= b;
        else
            puntaje += b;


        
    }

    // Update is called once per frame
    public void MostrarPuntos()
    {
        texto.text = puntaje.ToString();
       
    }

    private void Update()
    {
        if(contador>0)
        {
            contador -= Time.deltaTime;
            spawn.time -= (Time.deltaTime / 5);
            spawn.speed += (Time.deltaTime * 2);

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
            spawn.Explotan();
            if(tiempoEspera<=0)
            {
                gameOver.SetActive(true);

                gameOverText.text = puntaje.ToString();

                TotalHerramientas();

                Debug.Log("Error: " + error);

                fin = true;
            }

           

        }
    }

  

    void ContadorLineas(int a)
    {
        switch (a)
        {
            case 54:
                lineas[0].sprite = lineaVacia;
                break;
            case 48:
                lineas[1].sprite = lineaVacia;
                break;
            case 42:
                lineas[2].sprite = lineaVacia;
                break;
            case 36:
                lineas[3].sprite = lineaVacia;
                break;
            case 30:
                lineas[4].sprite = lineaVacia;
                break;
            case 24:
                lineas[5].sprite = lineaVacia;
                break;
            case 18:
                lineas[6].sprite = lineaVacia;
                break;
            case 12:
                lineas[7].sprite = lineaVacia;
                break;
            case 6:
                lineas[8].sprite = lineaVacia;
                break;
            case 0:
                lineas[9].sprite = lineaVacia;
                break;
        }
    }
}
