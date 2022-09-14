using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class BurbujasFuncion : MonoBehaviour
{
    [SerializeField] Burbujas burbjasDatos;
    [SerializeField] TextMeshProUGUI texto;
    [SerializeField] Manager manager;
    [SerializeField] Sprite sprite;
    [SerializeField] Animator anim;
    [SerializeField] AudioClip audio;
    bool click = false;
    

    public bool tache { get { return burbjasDatos.tacheBurbuja; } }

    private void Awake()
    {
        manager = GameObject.FindObjectOfType<Manager>();
    }
    public void Clickeado()
    {
        GetComponent<Image>().raycastTarget = false;
       
        if (manager.contador>0&&!click)
        {
            click = true;
            manager.GetComponent<AudioSource>().clip = audio;
            manager.GetComponent<AudioSource>().Play();
            if (burbjasDatos.tacheBurbuja)
            {
                //gameObject.GetComponent<Image>().sprite = sprite;

                texto.text = "-" + burbjasDatos.valorBurbuja.ToString();
                // se resta valor
                manager.ActualizarPuntos(true, burbjasDatos.valorBurbuja);

                manager.error++;


            }
            else
            {
                //gameObject.GetComponent<Image>().sprite = sprite;

                texto.text = "+" + burbjasDatos.valorBurbuja.ToString();
                //se suma
                manager.ActualizarPuntos(false, burbjasDatos.valorBurbuja);

                Herramienta(burbjasDatos.numeroObjeto);

            }
           
            
            anim.Play("Explotar");
            manager.MostrarPuntos();
            Destroy(this.gameObject, 1f);

        }

        
    }


    void Herramienta(int a)
    {
        switch(a)
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
        }
    }

    public void Byebye()
    {
        anim.Play("Explotar");
        Destroy(this.gameObject, 1f);
    }
}
