using UnityEngine;


[CreateAssetMenu(fileName = "Nueva Burbuja", menuName = "Burbuja Herramienta")]
public class Burbujas : ScriptableObject
{
    [SerializeField] private int valor;
    [SerializeField] private bool tache;
    [SerializeField] private int numero;
    

    public int valorBurbuja { get { return valor; } }
    public bool tacheBurbuja { get { return tache; } }

    public int numeroObjeto { get { return numero; } }

    
}
