import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronLeft, Save, Car } from "lucide-react";
import { theme as C } from '@/theme';
import { Btn, PageHeader, FormField, Spinner } from '@/components/ui';
import { vehiculesService } from '@/services/vehicules.service';
import { clientsService } from '@/services/clients.service';
import { toast } from 'react-hot-toast';

const vehiculeSchema = z.object({
  immatriculation: z.string().min(2, 'L\'immatriculation est requise'),
  marque: z.string().min(2, 'La marque est requise'),
  modele: z.string().min(2, 'Le modèle est requis'),
  annee: z.preprocess((val) => Number(val), z.number().min(1900).max(new Date().getFullYear() + 1)),
  proprietaire: z.string().min(1, 'Le propriétaire est requis'),
  km: z.preprocess((val) => Number(val), z.number().min(0)),
});

export default function VehiculeFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);

  const { data: vehicule, isLoading: isLoadingVehicule } = useQuery({
    queryKey: ['vehicule', id],
    queryFn: () => vehiculesService.getById(id),
    enabled: isEdit,
  });

  const { data: clients } = useQuery({
    queryKey: ['clients'],
    queryFn: () => clientsService.getAll()
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(vehiculeSchema),
    values: vehicule || {
      immatriculation: '',
      marque: '',
      modele: '',
      annee: new Date().getFullYear(),
      proprietaire: '',
      km: 0,
    }
  });

  const mutation = useMutation({
    mutationFn: (data) => isEdit ? vehiculesService.update(id, data) : vehiculesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicules'] });
      toast.success(isEdit ? 'Véhicule mis à jour' : 'Véhicule créé');
      navigate('/vehicules');
    },
    onError: (error) => {
      toast.error(error.message || 'Une erreur est survenue');
    }
  });

  const onSubmit = (data) => mutation.mutate(data);

  if (isEdit && isLoadingVehicule) return <Spinner />;

  return (
    <div>
      <div 
        onClick={() => navigate("/vehicules")} 
        style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", marginBottom: 16 }}
      >
        <ChevronLeft size={16} color={C.primary} />
        <span style={{ fontSize: 13, color: C.primary, fontWeight: 600 }}>Retour au parc</span>
      </div>

      <PageHeader 
        breadcrumb={`Parc / ${isEdit ? 'Édition' : 'Nouveau'}`} 
        title={isEdit ? `Modifier le véhicule ${vehicule?.immatriculation}` : "Ajouter un Véhicule"}
      />

      <div style={{ background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, padding: 32, maxWidth: 800 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <FormField 
              label="Immatriculation" 
              name="immatriculation"
              register={register}
              error={errors.immatriculation}
              placeholder="Ex: TG 1234 AA" 
            />
            <FormField 
              label="Marque" 
              name="marque"
              register={register}
              error={errors.marque}
              placeholder="Ex: Toyota" 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <FormField 
              label="Modèle" 
              name="modele"
              register={register}
              error={errors.modele}
              placeholder="Ex: Corolla" 
            />
            <FormField 
              label="Année" 
              type="number"
              name="annee"
              register={register}
              error={errors.annee}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <FormField 
              label="Propriétaire (Client)" 
              type="select"
              name="proprietaire"
              register={register}
              error={errors.proprietaire}
              placeholder="Sélectionner un client"
              options={clients?.map(c => ({ label: c.name, value: c.name })) || []}
            />
            <FormField 
              label="Kilométrage" 
              type="number"
              name="km"
              register={register}
              error={errors.km}
              placeholder="0" 
            />
          </div>

          <div style={{ marginTop: 32, display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Btn outline onClick={() => navigate('/vehicules')}>Annuler</Btn>
            <Btn primary type="submit" icon={Save} loading={mutation.isPending}>
              {isEdit ? 'Mettre à jour' : 'Enregistrer'}
            </Btn>
          </div>
        </form>
      </div>
    </div>
  );
}
