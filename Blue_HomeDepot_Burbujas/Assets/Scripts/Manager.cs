using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class Manager : MonoBehaviour
{

    [SerializeField] private int puntaje;
    [SerializeField] TextMeshProUGUI texto;

    public int puntos { get { return puntaje; } }

    // Start is called before the first frame update
    void Start()
    {
        MostrarPuntos();
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
}
