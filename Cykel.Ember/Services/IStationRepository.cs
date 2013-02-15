using Cykel.Ember.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Cykel.Ember.Services
{
    public interface IStationRepository
    {
        IEnumerable<StationModel> GetAll();
        StationModel Get(string id);
    }
}