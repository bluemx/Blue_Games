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

    private void Awake()
    {
        manager = GameObject.FindObjectOfType<Manager>();
    }
    public void Clickeado()
    {
        Debug.Log("Click");

        if(burbjasDatos.tacheBurbuja)
        {
            gameObject.GetComponent<Image>().sprite = sprite;
            texto.text ="-"+ burbjasDatos.valorBurbuja.ToString();
            // se resta valor
            manager.ActualizarPuntos(true, burbjasDatos.valorBurbuja);

            Destroy(this.gameObject, 3f);

        }
        else
        {
            gameObject.GetComponent<Image>().sprite = sprite;
            texto.text = "+" + burbjasDatos.valorBurbuja.ToString();
            //se suma
            manager.ActualizarPuntos(false, burbjasDatos.valorBurbuja);
            Destroy(this.gameObject, 3f);
        }

        manager.MostrarPuntos();
    }


}
