import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, Save, Car, Camera } from "lucide-react";
import { theme as C } from '@/theme';
import { Btn, PageHeader, FormField, Spinner } from '@/components/ui';
import { catalogueService } from '@/services/catalogue.service';
import { toast } from 'react-hot-toast';

const catalogueSchema = z.object({
  marque: z.string().min(2, 'La marque est requise'),
  modele: z.string().min(2, 'Le modèle est requis'),
  annee: z.preprocess((val) => Number(val), z.number().min(1900).max(new Date().getFullYear() + 1)),
  prix: z.preprocess((val) => Number(val), z.number().min(0)),
  etat: z.string().min(1, 'L\'état est requis'),
  transmission: z.string().min(1, 'La transmission est requise'),
  carburant: z.string().min(1, 'Le carburant est requis'),
  description: z.string().min(10, 'La description est requise (min 10 car.)'),
});

export default function CatalogueFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);

  const { data: item, isLoading } = useQuery({
    queryKey: ['catalogue-item', id],
    queryFn: () => catalogueService.getById(id),
    enabled: isEdit,
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(catalogueSchema),
    values: item || {
      marque: '',
      modele: '',
      annee: new Date().getFullYear(),
      prix: 0,
      etat: 'Neuf',
      transmission: 'Automatique',
      carburant: 'Essence',
      description: '',
    }
  });

  const mutation = useMutation({
    mutationFn: (data) => isEdit ? catalogueService.update(id, data) : catalogueService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['catalogue'] });
      toast.success(isEdit ? 'Annonce mise à jour' : 'Annonce créée');
      navigate('/catalogue');
    },
    onError: (error) => {
      toast.error(error.message || 'Une erreur est survenue');
    }
  });

  const onSubmit = (data) => mutation.mutate(data);

  if (isEdit && isLoading) return <Spinner />;

  return (
    <div>
      <div 
        onClick={() => navigate("/catalogue")} 
        style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", marginBottom: 16 }}
      >
        <ChevronLeft size={16} color={C.primary} />
        <span style={{ fontSize: 13, color: C.primary, fontWeight: 600 }}>Retour au catalogue</span>
      </div>

      <PageHeader 
        breadcrumb={`Catalogue / ${isEdit ? 'Édition' : 'Nouveau'}`} 
        title={isEdit ? `Modifier l'annonce ${item?.marque} ${item?.modele}` : "Ajouter au Catalogue"}
      />

      <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 32, maxWidth: 900 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <FormField 
              label="Marque" 
              name="marque"
              register={register}
              error={errors.marque}
              placeholder="Ex: Toyota" 
            />
            <FormField 
              label="Modèle" 
              name="modele"
              register={register}
              error={errors.modele}
              placeholder="Ex: Camry" 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
            <FormField 
              label="Année" 
              type="number"
              name="annee"
              register={register}
              error={errors.annee}
            />
            <FormField 
              label="Prix (FCFA)" 
              type="number"
              name="prix"
              register={register}
              error={errors.prix}
              placeholder="12000000" 
            />
            <FormField 
              label="État" 
              type="select"
              name="etat"
              register={register}
              error={errors.etat}
              options={[
                { label: 'Neuf', value: 'Neuf' },
                { label: 'Occasion', value: 'Occasion' },
              ]}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <FormField 
              label="Transmission" 
              type="select"
              name="transmission"
              register={register}
              error={errors.transmission}
              options={[
                { label: 'Automatique', value: 'Automatique' },
                { label: 'Manuelle', value: 'Manuelle' },
              ]}
            />
            <FormField 
              label="Carburant" 
              type="select"
              name="carburant"
              register={register}
              error={errors.carburant}
              options={[
                { label: 'Essence', value: 'Essence' },
                { label: 'Diesel', value: 'Diesel' },
                { label: 'Hybride', value: 'Hybride' },
                { label: 'Électrique', value: 'Électrique' },
              ]}
            />
          </div>

          <FormField 
            label="Description détaillée" 
            type="textarea"
            name="description"
            register={register}
            error={errors.description}
            placeholder="Décrivez l'état du véhicule, les options..." 
          />

          <div style={{ marginTop: 20 }}>
             <label style={{ fontSize: 11, fontWeight: 600, color: C.gray, display: "block", marginBottom: 8, textTransform: "uppercase" }}>Photos du véhicule</label>
             <div style={{ 
               width: '100%', height: 120, border: `2px dashed ${C.border}`, borderRadius: 8,
               display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
               color: C.gray, cursor: 'not-allowed', background: '#F8FAFC'
             }}>
               <Camera size={24} style={{ marginBottom: 8 }} />
               <div style={{ fontSize: 12 }}>Glissez vos photos ici (Phase 8)</div>
             </div>
          </div>

          <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Btn outline onClick={() => navigate('/catalogue')}>Annuler</Btn>
            <Btn primary type="submit" icon={Save} loading={mutation.isPending}>
              {isEdit ? 'Mettre à jour' : 'Publier l\'annonce'}
            </Btn>
          </div>
        </form>
      </div>
    </div>
  );
}
