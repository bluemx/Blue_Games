using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Piezas : MonoBehaviour
{
    [SerializeField] PiezasScriptable pieza;
    [SerializeField] Manager manager;
    [SerializeField] AudioClip sonido;
    [SerializeField] AudioClip cubeta;
    [SerializeField] GameObject c;

    private void Awake()
    {
        manager = GameObject.FindObjectOfType<Manager>();
        c = GameObject.Find("Cubeta");
    }

    // Start is called before the first frame update
    void Start()
    {
        
    }

    // Update is called once per frame
    void Update()
    {
        
    }


    private void OnTriggerEnter2D(Collider2D collision)
    {
        

        if(collision.gameObject.name=="collider")
        {
            c.GetComponent<AudioSource>().Play();
            if (pieza.esPiedra)
            {
                manager.Cubeta(true);
                
                manager.ActualizarPuntos(true, pieza.valorPieza, sonido);
                manager.error++;
            }

            else
            {
                manager.Cubeta(false);
                manager.ActualizarPuntos(false, pieza.valorPieza,sonido);

                Herramienta(pieza.numeroObjeto);
            }

            
            manager.Particulas();
            //manager.MostrarPuntos();
            
            Destroy(this.gameObject);

        }
    }


    void Herramienta(int a)
    {
        switch (a)
        {
            case 0:
                manager.herramientas[0]++;
                break;
            case 1:
                manager.herramientas[1]++;
                break;
            case 2:
                manager.herramientas[2]++;
                break;
            case 3:
                manager.herramientas[3]++;
                break;
            case 4:
                manager.herramientas[4]++;
                break;
            case 5:
                manager.herramientas[5]++;
                break;
            case 6:
                manager.herramientas[6]++;
                break;
        }
    }
}
