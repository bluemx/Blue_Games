using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class BotePintua : MonoBehaviour
{

    [SerializeField] Sprite[] spritesCubeta;
    [SerializeField] bool tira = false;

    [SerializeField] GameObject[] bolitas;
    [SerializeField] float bolitaVelocidad = 500;
    public Transform firePoint;

    int colorB = 0;
    [SerializeField] GameObject indicador;

    [SerializeField] Sprite[] indicadores;


    ManagerBolitas manager;
    Manager m;

    
    
    

    // Start is called before the first frame update
    void Start()
    {
        manager = FindObjectOfType<ManagerBolitas>();
        m = FindObjectOfType<Manager>();
    }

    // Update is called once per frame
    void Update()
    {

        Indicador(gameObject.GetComponent<Image>().sprite.name);

        //manager.color = colorB;

        if (Input.GetMouseButtonDown(0)&& m.contador>0)
        {
           
            if (!m.pantallaPausa.activeInHierarchy&&!SobreMi.instancia.pausando)
            {
               if(!m.puedoTirar)
                {
                    //m.puedoTirar = true;

                    //manager.Proceso();

                    MiColor(gameObject.GetComponent<Image>().sprite.name);

                    GameObject bolitaClone = Instantiate(bolitas[colorB], transform);

                    bolitaClone.transform.position = firePoint.position;

                    
                    

                    tira = true;
                    manager.banderas = false;
                    StartCoroutine("Tirando");

                }
               
            }

            
        }
        if (tira)
        {
            Cambia();
            tira = false;
            manager.banderas = true;
        }

        //if(m.puedoTirar)
        //{
        //    StartCoroutine("Tirando");
        //}
    }

    IEnumerator Tirando()
    {

        yield return new WaitForSeconds(2f);

        m.puedoTirar = false;
    }

    void Cambia()
    {
        gameObject.GetComponent<Image>().sprite = spritesCubeta[Random.Range(0, spritesCubeta.Length)];
    }

    void Indicador(string name)
    {


        switch (name)
        {
            case "Azul Cubeta":
                indicador.GetComponent<Image>().sprite = indicadores[0];
                
                break;
            case "Morado Cubeta":
                indicador.GetComponent<Image>().sprite = indicadores[3];
                
                break;
            case "Rojo Cubeta":
                indicador.GetComponent<Image>().sprite = indicadores[2];
                
                break;
            case "Amarillo Cubeta":
                indicador.GetComponent<Image>().sprite = indicadores[1];
                
                break;
        }
    }

    void MiColor(string name)
    {
        switch (name)
        {
            case "Azul Cubeta":
                colorB = 0;
                break;
            case "Morado Cubeta":
                colorB = 3;
                break;
            case "Rojo Cubeta":
                colorB = 2;
                break;
            case "Amarillo Cubeta":
                colorB = 1;
                break;
        }
    }
}
